const router = require("express").Router();
const Student = require("../model/Student");
const Timetable = require("../utils/timetable.js")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {studentRegisterValid, studentLoginValid} = require('./validation');


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
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if(!student) return res.status(400).json("Email doesn't exists!");

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
       res.status(200).json(student);
   } 
   catch(err)
   {
       res.status(404).send("Invalid Request!");
   }
};


module.exports = {
    studentRegister,
    studentLogin,
    studentTimetable,
    studentProfile 
};