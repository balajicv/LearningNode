var url = require("url");
var multer = require("multer");
require("./db/schemas/user");

var pattern="",
	mongoose=require("mongoose");
	User = mongoose.model("user");

var routes = function(app){

	var storage = multer.diskStorage({
		  destination: function (req, file, cb) {
		    cb(null, './uploads/')
		  },
		  filename: function (req, file, cb) {
		    cb(null, file.originalname + '-' + Date.now())
		  }
	});

	var mul = multer({ storage: storage })

	//var mul = multer({ dest: './uploads/' });
	app.post('/upload', mul.any(),function(req,res,next){		   		
		    res.redirect("/upload");
	});

	app.get('/upload', function(req,res,next){
		 res.render("upload");
	});


	// app.get("/hello/:user",function(req,res){	
	// 	res.send("hello "+req.params.user);
	// });

	app.get("/login",function(req,res){			
		//res.send(pattern);
		res.render("login")
	});

	app.post("/login",function(req,res,next){
		var email=req.body.email;
		var pwd = req.body.password;
		User.findOne({"email":email},function(err,data){
			console.log("query result ",data);
			if(!data)
				res.render("error");
			else
			{
				if(data.password === pwd)
				{
					res.redirect("/upload");
					console.log("login successfull "+email);
				}
				else
					res.render("error");
			}
		});		
	})

	//redirecting to the add user page
	app.get("/newuser",function(req,res){			
		res.render("newuser");
	});

	//registering the new user 
	app.post("/newuser",function(req,res){
		console.log("in post new users")
		var newUser = new User({
			name:req.body.uname,
			password:req.body.password,
			email:req.body.email
		});
		console.log("user ",newUser);
		console.log("saving the new user");
		newUser.save(function(err){ if(err) console.log(err); else console.log("user added successfully")});
		res.redirect("/login");
	});

    //redirecting to the bs page
	app.get("/bs",function(req,res){			
		res.render("bs");
	});
}

module.exports=routes;
