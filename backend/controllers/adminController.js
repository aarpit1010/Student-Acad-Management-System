const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const course_summary = require("../model/marks");


const adminLogin = function (req, res) {
    const username=req.body.username;
    const password=req.body.password;
    if(username=="admin"&&password=="1234")
    {
        // res.render("dashboard");
        res.json({message:"admin login successful"});
    }
    else
    {
        res.status(400).json("Invalid Credentials!");
    }
};

const studentCoursesummary = async (req,res) => {
    const coursesummary = new course_summary(req.body);
    console.log("chkhere");
    const savedStudentmarks = await coursesummary.save();
    console.log("checknow");
        res.status(200).json(savedStudentmarks);
};




module.exports = {
    adminLogin, studentCoursesummary
  };