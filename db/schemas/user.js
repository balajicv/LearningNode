var mongoose = require("mongoose"), 
	schema = mongoose.Schema;

var User = new schema({
	"name":String, 
	"password":String,
	"email":String
});

mongoose.model("user",User);