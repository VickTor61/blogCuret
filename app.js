//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lorem ipsum dolor sit amet, suas ponderum laboramus duo ad, his eu dicunt conclusionemque.Periculis interpretaris ex per, nominavi mediocritatem nec at.";

const aboutContent =
  " Officiis interesset sadipscing no vis. Elitr tritani erroribus per et. An quo esse simul petentium,";

const contactContent =
  " Erat tibique partiendo an eos, ne pri unum dicunt, unum fuisset ne vim.Melius lobortis consulatu eum ea, quo fugit corpora eu.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const MONGO_URI = process.env.MONGO_URL || "";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("post", blogSchema);

app.get("/", function(req, res) {
  Post.find({}, (err, foundItems) => {
    res.render("home", {
      startingContent: homeStartingContent,
      display: foundItems
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function(req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  newPost.save(err => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:posted", function(req, res) {
  Post.find({}, (err, foundItems) => {
    if (!err) {
      const postTitle = _.lowerCase(req.params.posted);
      foundItems.forEach(post => {
        const composeLowercase = _.lowerCase(post.title);

        if (postTitle === composeLowercase) {
          res.render("post", {
            title: post.title,
            content: post.content
          });
        }
      });
    }
  });
});

//delete post from both frontend and backend

app.delete("/delete/:postId", (req, res) => {
  console.log(req.params);
  const postId = req.params.postId;

  Post.findByIdAndDelete(postId, err => {
    if (!err) {
      console.log("successfully " + postId + " deleted from database");
    }
  }).catch(err => console.log(err));

  res.json({ message: "Delete successfully" });
});

app.listen(process.env.PORT || 3030, function() {
  console.log("server running at port 3030");
});
