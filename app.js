var express = require("express");
var app = express()
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost/petshop", {useNewUrlParser:true, useUnifiedTopology:true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded ({extended:true}));

app.use(require("express-session")({
	secret: "i am the legend",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
	res.redirect("/home");
	})
app.get("/home",function(req,res){
	res.render("Index");

})
app.get("/home/pets",function(req,res){
	res.render("Pets");
})

app.get("/home/cats",function(req,res){
	res.render("Cats");
})
app.get("/home/dogs",function(req,res){
	res.render("Dogs");
})
app.get("/home/fish",function(req,res){
	res.render("Fish");
})
app.get("/home/hamster",function(req,res){
	res.render("Hamster");
})
app.get("/home/parrots",function(req,res){
	res.render("Parrots");
})
app.get("/home/rabbites",function(req,res){
	res.render("Rabbites");
})
/////////////////////////////////////////////////
app.get("/register",function(req,res){
	res.render("Registeration");
})

app.post("/register",function(req,res){
	User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function(err,user){
		if(err){
			console.log("error");
			return res.render("Registeration");
		}else{
		passport.authenticate("local")(req,res, function(){
			
			res.redirect("/home/pets");
	})
		}
})
})

app.get("/home/login",function(req,res){

	res.render("Index");
})

app.post("/login",passport.authenticate("local",{
	successRedirect: "/home/pets",
	failureRedirect: "/login"
	
}),function(req,res){	
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
})

function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
			// console.log(req.user);
		return next();
	}
	res.redirect("/login");
}


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server starts");
})