const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {course_summary, droppedcourses} = require("../model/marks");
const faculty_list = require("../model/facultyList");
const Log = require("../model/log");


const adminLogin = function (req, res) {
    const username=req.body.username;
    const password=req.body.password;
    if(username=="admin"&&password=="1234")
    {
        now = new Date();
        var current_date_time = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear()
            + '    '+ now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
        
        const log = new Log({
            createdAt: current_date_time,
            action: "Successfully Logged In",
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });

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

    now = new Date();
    var current_date_time = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear()
        + '    '+ now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    
    const log = new Log({
        createdAt: current_date_time,
        action: "Added new Student's Marks & Attendance",
        role: "ADMIN" 
    });

    log.save(function(err){
        if(err){
            console.log(err);
        } else {
            // console.log("Updated Logs");
        }
    });

    res.status(200).json(savedStudentmarks);
};

const studentdroppedcourses = async (req,res) => {
    const droppedCourses= new droppedcourses(req.body);
    
    const enrollmentExist = await droppedcourses.findOne({ enrollment : req.body.enrollment});
    if(enrollmentExist)
    {
        enrollmentExist.dropped_courses=[];
        for(i=0;i<req.body.dropped_courses.length;i++)
        {
            enrollmentExist.dropped_courses.push(req.body.dropped_courses[i]);
        }
        enrollmentExist.save();

        now = new Date();
        var current_date_time = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear()
            + '    '+ now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
        
        const log = new Log({
            createdAt: current_date_time,
            action: "Updated List of Student's Dropped Courses",
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });

        res.status(400).json(enrollmentExist.dropped_courses);
    }

    else
    {
        var enroll=new droppedcourses();
        enroll.enrollment=req.body.enrollment;
        for(i=0;i<req.body.dropped_courses.length;i++)
        {
            enroll.dropped_courses.push(req.body.dropped_courses[i]);
        }
        enroll.save();

        now = new Date();
        var current_date_time = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear()
            + '    '+ now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
        
        const log = new Log({
            createdAt: current_date_time,
            action: "Added List of Student's Dropped Courses",
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });

        res.status(200).json(enroll.dropped_courses);
    }
}

const facultyList = async (req, res) => {
    const addFaculty = new faculty_list(req.body);
    
    const profExists = await faculty_list.findOne({ branch : req.body.branch,
         semester : req.body.semester, section : req.body.section});
    if(profExists) res.status(400).json("Faculty has already been added");
    
    const facultyDB = await addFaculty.save();

    now = new Date();
    var current_date_time = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear()
        + '    '+ now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    
    const log = new Log({
        createdAt: current_date_time,
        action: "Added Faculty List",
        role: "ADMIN" 
    });

    log.save(function(err){
        if(err){
            console.log(err);
        } else {
            // console.log("Updated Logs");
        }
    });

    res.status(200).json(facultyDB);
       
};

const logReport = async (req,res) => {
    const logExists = await Log.find({});
    if(logExists) res.status(200).json(logExists);
};


module.exports = {
    adminLogin, 
    studentCoursesummary,
    studentdroppedcourses,
    facultyList,
    // acadcal
    logReport
  };