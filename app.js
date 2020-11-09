//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const Swal = require("sweetalert2");

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

mongoose.connect(
  "mongodb+srv://victor-admin:osasenaga@cluster0.ld5s3.mongodb.net/blogDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("post", blogSchema);

app.get("/", function (req, res) {
  Post.find({}, (err, foundItems) => {
    res.render("home", {
      startingContent: homeStartingContent,
      display: foundItems,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  newPost.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:posted", function (req, res) {
  Post.find({}, (err, foundItems) => {
    if (!err) {
      const postTitle = _.lowerCase(req.params.posted);
      foundItems.forEach((post) => {
        const composeLowercase = _.lowerCase(post.title);

        if (postTitle === composeLowercase) {
          res.render("post", {
            title: post.title,
            content: post.content,
          });
        }
      });
    }
  });
});

app.delete("/delete/:id", function (req, res) {
  let query = { _id: req.params.id };
console.log(query);

   Post.deleteOne(query, (err) => {
      if(!err) {
        console.log("successfully deleted " + query._id + "from database");

        res.redirect("/");
      } else{
        console.log(err);
      }
    
    })
    
});

app.listen(process.env.PORT || 3030, function () {
  console.log("server running on port 3030");
});
