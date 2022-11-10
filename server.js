/*
Name:Arshit Gilhotra
Student ID:125619213
Course:WEB322
Email:garshit@myseneca.ca
*/ 
var express = require("express");
var app = express();
var path =require("path");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');



// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/index.html"));
    });
    app.get("/index", function(req,res){
      res.sendFile(path.join(__dirname, '/index.html'));
    });
  
    app.get("/blog", function(req,res){
      res.render("blog",{layout:false})
    });
    app.get("/registration", function(req,res){
      res.render("registration",{layout:false})
    });
  app.get("/article", function(req,res){
    res.sendFile(path.join(__dirname, '/article.html'));
  });



  app.get("/login", function(req,res){

    res.render("login", {layout : false});
});
app.post("/login", (req, res) => {
  var userdata = {
      user: req.body.username,
      pass: req.body.password,
      expression: /[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(req.body.username)
  }

  if (userdata.user == "" || userdata.pass == "") {
      res.render("login", { data: userdata, layout: false });
      return;
  }

  if (userdata.expression) {
      res.render("login", { data: userdata, layout: false });
      return;
  }

  res.render("blog", { layout: false });

});
app.use(function(req,res){
  res.status(404).send("Page not found")
})

 
// setup another route to listen on /about

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT,onHttpStart());