//jshint esversion:6
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

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Post = mongoose.model("post", blogSchema);

const day1 = new Post({
  title: "todays posts",
  content: "whatsoever it is is what exactly it",
});
const day2 = new Post({
  title: "todays jaklhfuohaou",
  content: "whatsoever it is is efklj exactly itbjalkbsvvvvvvvvvvjvjblamkm  hkjfvbjkhalsnpohsoihha[piohaosh ikoshvpiohia ijviaoh",
});
// Post.updateOne({ "_id" : "5f9040b0be369d3640fe4bc1"}, {$set: {content: "whatsoever it is is efklj exactly itbjalkbsvvvvvvvvvvjvjblamkm  hkjfvbjkhalsnpohsoihha[piohaosh ikoshvpiohia ijviaoh"}}, (err) => err ? console.log(err): console.log("success"));

const posts = ([day1, day2]);

app.get("/", function (req, res) {
  Post.find({}, (err, posts) => {
    err
      ? console.log(err)
      : res.render("home", {
          startingContent: homeStartingContent,
          display: posts
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
  const composeBody = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(composeBody);

  res.redirect("/");
});
app.get("/posts/:posted", function (req, res) {
  const postTitle = _.lowerCase(req.params.posted);
  for (i = 0; i < posts.length; i++) {
    const composeLowercase = _.lowerCase(posts[i].title);

    if (postTitle === composeLowercase) {
      res.render("post", {
        title: posts[i].title,
        content: posts[i].content,
      });
    }
  }
});

app.listen(process.env.PORT || 3030, function () {
  console.log("server running at port 3030");
});
