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

mongoose.connect("mongodb+srv://victor-admin:osasenaga@cluster0.ld5s3.mongodb.net/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("post", blogSchema);

const day1 = new Post({
  title: "day-1",
  content: "go to the compose page to publish your blog",
});
const day2 = new Post({
  title: "day-2",
  content: "click on each of the blog posts to delete a post",
});

const posts = [day1, day2];

app.get("/", function (req, res) {
  try {
  Post.find({}, (err, foundItems) => {
    if (!foundItems) {
      Post.insertMany(posts, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully inserted");
        }
      });
      res.redirect("/");
    } else {
      res.render("home", {
        startingContent: homeStartingContent,
        display: foundItems,
      });
    }
  });
}catch(err){
  next(err
)
}
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

  const newPost = new Post({
    title: composeBody.title,
    content: composeBody.content,
  });

  newPost.save();

  res.redirect("/");
});
app.get("/posts/:posted", function (req, res) {
  try {
  Post.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
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
} catch(err) {
  next(err);
}
});

//delete post from both frontend and backend

app.post("/delete", (req, res) => {
  try {
  const deleteItem = req.body.deleteBtn;

  Post.findByIdAndRemove(deleteItem, (err) => {
    err ? console.log(err) : console.log("successfully deleted from database");
  });
  res.redirect("/");
}
catch(err) {
  next(err)
}
});

app.listen(process.env.PORT || 3030, function () {
  console.log("server running at port 3030");
});
