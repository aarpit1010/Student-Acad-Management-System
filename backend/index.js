const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();

const studentRouter = require("./routes/studentRouter");
// const adminRouter = require("./routes/adminRouter");


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


app.use(studentRouter);


app.listen(3000,function(){
console.log("server started on port 3000");
});

