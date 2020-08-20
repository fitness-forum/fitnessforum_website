//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASSWORD+'@fitness-forum.rcrvu.mongodb.net/membershipDB', {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
// app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let memberships = [];

const membershipSchema = {
  Name : String,
  Email : String,
  Phone : String,
  Message : String
};

const Membership = mongoose.model("Membership",membershipSchema);

let contacts = [];

const contactSchema = {
  Name : String,
  Email : String,
  Message : String
}

const Contact = mongoose.model("Contact",contactSchema);

app.get("/",function(req,res){
  res.redirect("/home");
});

  app.get("/home",function(req,res){
    res.render("about-us");
  });

  app.get("/contact",function(req,res){
    res.render("contact-us");
  });


  app.get("/aerobics",function(req,res){
    res.render("aerobics");
  });

  app.get("/core-strength",function(req,res){
    res.render("core_strength");
  });

  app.get("/functional-training",function(req,res){
    res.render("functional_training");
  });

  app.get("/hiit",function(req,res){
    res.render("hiit");
  });

  app.get("/virtual-training",function(req,res){
    res.render("virtual_training");
  });


app.post("/",function(req,res){

  const name = req.body.mf_name;
  const email = req.body.mf_email;
  const phone = req.body.mf_phone;
  const message = req.body.mf_message;


  const membership = new Membership({
    Name : name,
    Email : email,
    Phone: phone,
    Message: message 
    });

  membership.save();
  res.redirect("/");
});

app.post("/contact",function(req,res){

  const name = req.body.cf_name;
  const email = req.body.cf_email;
  const message = req.body.cf_message;


  const contact = new Contact({
    Name : name,
    Email : email,
    Message: message 
    });

  contact.save();
  res.redirect("/contact");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
