const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const course_summary = require("../model/marks");


const adminLogin = function (req, res) {
    const username=req.body.username;
    const password=req.body.password;
    if(username=="admin"&&password=="1234")
    {
        const admintoken = jwt.sign({
            _id: password
          },
          process.env.TOKEN_SECRET
        );
        res.header('admin-auth-token', admintoken).json(admintoken);
    }
    else
    {
        res.status(400).json("Invalid Credentials!");
    }
};

const studentCoursesummary = async (req,res) => {
    const coursesummary = new course_summary(req.body);
    
    const enrollmentExist = await course_summary.findOne({ enrollment : req.body.enrollment});
    if(enrollmentExist) return res.status(400).json('Enrollment already exists');
    
    const savedStudentmarks = await coursesummary.save();
    // console.log("checknow");
    // res.status(200).json(savedStudentmarks.semester_marks[0].c1);
    res.status(200).json(savedStudentmarks);
};




module.exports = {
    adminLogin, studentCoursesummary
  };