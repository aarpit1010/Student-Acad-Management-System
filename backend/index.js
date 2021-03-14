const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption");
const Student = require("./models/Student.js")
const Admin = require("./models/Admin.js")
const Timetable = require("./content/timetable.js")


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


const db = require("./db");
db.once("open", function () {
	console.log("Connected to MongoDB");
});
db.on("error", function(err) {
	console.log(err);
});


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
const newUser=new Student({
	name:req.body.name,
	username:req.body.username,
	email:req.body.email,
	password:req.body.password,
	contact:req.body.contact,
	section:req.body.section,
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

var currUser;

app.post("/login",function(req,res){
 const username=req.body.username;
 const password=req.body.password;
 Student.findOne({username:username},  function(err,foundUser){
 	if(err){
 		console.log(err);
 	}
 	else
 	{
 		if(foundUser)
 		{
			//  console.log(foundUser);
 			if(foundUser.password==password){
				currUser=foundUser;
				 res.render("dashboard");
				//  console.log(currUser);
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


function buttonClicked() {
	print("Button Working");
};

// app.post("/timetable",function(req,res){
// 	// const day=req.body.day;
// 	// const timeslot=req.body.timeslot;
// 	Timetable.find("timetable",
// 				{semester: currUser.semester,
// 				section:currUser.section}, function(err,docs) {
// 				// console.log(docs);
// 				res.render("timetable", {
// 					data: docs
// 				});
// 				});

// 	// 		 {
// 	// 			console.log(docs);
// 	// 		}
// 	// console.log(day);
// });

app.get("/timetable",function(req,res){
	Timetable.finder("timetable",
					{
						semester: currUser.semester,
						section:currUser.section
					}, 
						function(err,docs) {
					res.render("timetable", {
					user: req.semester,
					data: docs
				});
				});
	// res.render("timetable", {semester: currUser.semester,
	// 	section:currUser.section});
});

app.listen(3000,function(){
console.log("server started on port 3000");
});

