const Student = require("../models/Student.js")
const Admin = require("../models/Admin.js")
const Timetable = require("../content/timetable.js")
const mongoose = require('mongoose');
const encrypt=require("mongoose-encryption");



const studentRegister = function (req, res)  {
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
};


var currUser;

const studentLogin = function (req, res)  {
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
};


const studentTimetable = function (req, res)  {
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
};


module.exports = {studentRegister, studentLogin, studentTimetable};