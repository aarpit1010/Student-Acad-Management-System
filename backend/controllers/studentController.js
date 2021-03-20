const router = require("express").Router();
const Student = require("../model/Student");
const course_summary = require("../model/marks");
const Timetable = require("../utils/timetable.js");
const Courses = require("../utils/courses.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {studentRegisterValid, studentLoginValid} = require('./validation');


const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, 
    { useUnifiedTopology: true ,
    useNewUrlParser: true}, 
    () => console.log('Connected to MongoDB')
); 


const studentRegister = async (req, res) => {
    const student = new Student(req.body);
    let givenEmail = req.body.email;
    let givenPassword = req.body.password;

    // validation
    const {error} = studentRegisterValid(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    // check whether user already in database or not
    const emailExist = await Student.findOne({ email: givenEmail});
    // const contactExist = await Student.findOne{( contact: req.body.contact)};
    if(emailExist) return res.status(400).json('Email already exists');

    // hash password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(givenPassword, salt);

    try {
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch(err) {
        res.status(400).json(err);
    }
};


const studentLogin = async (req, res) => {
    const { email, password } = req.body;

    // validation
    const {error} = studentLoginValid(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // check whether email exists 
    const student = await Student.findOne({ email });
    if(!student) return res.status(400).json("Email doesn't exists!");

    // check password
    const validPass = await bcrypt.compare(password, student.password);
    if(!validPass) return res.status(403).json("Invalid Password!");

    const token = jwt.sign({
        _id: student._id,
      },
      process.env.TOKEN_SECRET
    );
    res.header('auth-token', token).json(token);
 

};

const studentTimetable = async (req, res) => {
    const id=req.student._id;
       const student= await Student.findOne({_id:id});
       if(!student)
       res.status(400).json("Student doesn't exist in Database");

    Timetable.finder("timetable",
					{
						semester: student.semester,
						section:student.section
					}, 
					function(err,docs) {
                    res.json(
                    {user: student._id,
                    data: docs}
                    );
				});

};

const studentProfile= async (req,res) =>{
   try{
       const id=req.student._id;
       const student= await Student.findOne({_id:id});
       if(!student)
       res.status(400).json("Student doesn't exist in Database");
       Courses.findCourse("courses",
					{
						semester: student.semester,
						branch:student.branch
					}, 
					function(err,docs) {
       res.status(200).json({
            name:student.name,
            enrollment_no:student.username,
            email:student.email,
            contact:student.contact,
            branch:student.branch,
            semester:student.semester,
            section:student.section,
            enrolled_course_id:docs[0].course_id,
            enrolled_course_name:docs[0].course_name
       });
        });
    }
   catch(err)
   {
       res.status(403).json("Invalid Request!");
   }
};


const studentMarks = async (req,res) => {
    const id=req.student._id;
    const student= await Student.findOne({_id:id});
    if(!student)
    res.status(400).json("Student doesn't exist in Database");
    course_summary.find({enrollment:student.username}, function(err,docs) {
        if (err) {
            return res.status(404).json("NOT FOUND");
        }
        var enrolled_course_id;
        var enrolled_course_name;
        Courses.findCourse("courses",
            {
                semester: student.semester,
                branch: student.branch
            }, 
            function(err,docs2) {
                    enrolled_course_id=docs2[0].course_id;
                    enrolled_course_name=docs2[0].course_name;
                res.status(200).json({
                    course_id:enrolled_course_id,
                    course_name:enrolled_course_name,
                    marks_c1:docs[0].semester_marks[0].c1,
                    marks_c2:docs[0].semester_marks[0].c2,
                    marks_c3:docs[0].semester_marks[0].c3
                });
        });
    });
};

module.exports = {
    studentRegister,
    studentLogin,
    studentTimetable,
    studentProfile,
    studentMarks
};