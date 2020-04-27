const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require('request');

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

app.get("/", function(req,res){
  res.render("home");
});

app.get("/home", function(req,res){
  res.redirect("/");
})
app.use(function (req, res) {
  res.status(404).render('error');
});
app.listen(process.env.PORT||3000, function(){
  console.log("server started at port 3000");
});
