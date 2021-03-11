const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption");
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology: true});
const userSchema=new mongoose.Schema({
	username:String,
	password:String,
	name:String,
	contact:Number,
	semester:Number
});
const secret="itisasecret";
userSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
const User=new mongoose.model("User",userSchema);
app.get("/",function(req,res){
 	res.render("home");
});
app.get("/student",function(req,res){
	res.render("student");
});
app.get("/login",function(req,res){
	res.render("login");
})

app.get("/adminlogin",function(req,res){
	res.render("adminlogin");
})
app.get("/register",function(req,res){
 	res.render("register");
});
app.post("/register",function(req,res){
const newUser=new User({
	username:req.body.username,
	email:req.body.email,
	password:req.body.password,
	contact:req.body.contact,
	name:req.body.name,
    semester:req.body.semester,
    branch:req.body.branch,
    enrollment:req.body.enrollment

});
newUser.save(function(err)
{
	if(err){
		console.log(err);
	}
	else
	{
		res.render("student");
	}
});
});

app.post("/login",function(req,res){
 const username=req.body.username;
 const password=req.body.password;
 User.findOne({username:username},  function(err,foundUser){
 	if(err){
 		console.log(err);
 	}
 	else
 	{
 		if(foundUser)
 		{
 			if(foundUser.password==password){
 				res.render("dashboard");
 			}
 		}
 		else
 		{
 			console.log("error");
 		}
 	}
 });
});

app.post("/adminlogin",function(req,res){
 const username=req.body.username;
 const password=req.body.password;
 if(username=="admin"&&password=="1234")
 {
 	res.render("dashboard");
 }
 else
 {
 	console.log("error");
 }
});
app.listen(3000,function(){
console.log("server started on port 3000");
});

