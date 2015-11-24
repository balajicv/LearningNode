var express = require("express"),
	app=express(),
	logger = require("morgan"),
	bodyParser=require("body-parser"),
	mongoose = require("mongoose"), 
	multer=require("multer"),
  jQuery=require("jQuery"),
  jsdom=require("jsdom"),
  bs=require("bootstrap");

require("./db/schemas/user");

mongoose.connect("mongodb://localhost/users", function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: mongodb . ' + err);
      } else {
      console.log ('Succeeded connected to: mongodb');
      }
    });

 //or other option 

app.set("view engine","ejs");
app.use(logger());
app.use(bodyParser());
require("./routes")(app);

app.listen(80);
