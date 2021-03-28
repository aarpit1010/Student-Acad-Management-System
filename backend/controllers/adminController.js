const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {course_summary, droppedcourses,notifs} = require("../model/marks");
const faculty_list = require("../model/facultyList");
const Log = require("../model/log");
const Student = require("../model/Student");

var currentTime = new Date();

function currDateTime(currentTime) {
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;   
  var ISTTime = new Date(currentTime.getTime() + 
    (ISTOffset + currentOffset)*60000);
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var secondsIST = ISTTime.getSeconds();
  var time = hoursIST + ":" + minutesIST + ":" + secondsIST;
  var mnth = currentTime.getMonth() + 1;
  var date_time = currentTime.getDate() + 
    '-' + mnth +
    '-' + currentTime.getFullYear() + ' ' + time;
  return date_time;
}

const adminLogin = function (req, res) {
    const username=req.body.email;
    const password=req.body.password;
    if(username=="authority.iiita@gmail.com"&&password=="1234")
    {
        // var current_date_time = currDateTime(currentTime);
        
        // const log = new Log({
        //     createdAt: current_date_time,
        //     action: "Successfully Logged In",
        //     role: "ADMIN" 
        // });

        // log.save(function(err){
        //     if(err){
        //         console.log(err);
        //     } else {
        //         console.log("Updated Logs");
        //     }
        // });

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

    var current_date_time = currDateTime(currentTime);
    
    const log = new Log({
        createdAt: current_date_time,
        action: "Added "+coursesummary.enrollment+" Marks & Attendance",
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

        var current_date_time = currDateTime(currentTime);
        
        const log = new Log({
            createdAt: current_date_time,
            action: "Updated List of Dropped Courses for "+enrollmentExist.enrollment,
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

        var current_date_time = currDateTime(currentTime);
        
        const log = new Log({
            createdAt: current_date_time,
            action: "Added List of Dropped Courses for "+enroll.enrollment,
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

    if(profExists) return res.status(400).json("Faculty has already been added");
    
    const facultyDB = await addFaculty.save();

    var current_date_time = currDateTime(currentTime);
    
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

const notifications =async (req,res) =>{
    const  Notification= new notifs(req.body);
    
    const enrollmentExist = await notifs.findOne({ enrollment : req.body.enrollment});
    if(enrollmentExist)
    {  
        var notif_date_time = currDateTime(currentTime);

        var obj = {
            message: req.body.notifs_arr[0].message,
            sent_time: notif_date_time
        }
        enrollmentExist.notifs_arr.push(obj);

        enrollmentExist.save();

        res.status(200).json(enrollmentExist.notifs_arr);
        
        const log = new Log({
            createdAt: notif_date_time,
            action: "Sent another notification to "+enrollmentExist.enrollment,
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });
    }
    else
    {
        var enroll=new notifs();
        enroll.enrollment=req.body.enrollment;

        var notif_date_time = currDateTime(currentTime);

        var obj = {
            message: req.body.notifs_arr[0].message,
            sent_time: notif_date_time
        }
        enroll.notifs_arr.push(obj);

        enroll.save();
        res.status(201).json(enroll.notifs_arr);
        
        const log = new Log({
            createdAt: notif_date_time,
            action: "Sent Notifications to "+enroll.enrollment,
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });
    }
};

const updateProfile = async (req,res) => {
    const details = req.body;
    const enrollmentExist = await Student.findOne({ username : details.enrollment});
    var current_date_time = currDateTime(currentTime);
    if(enrollmentExist) {
       if(details.name) {
        Student.updateOne({username: details.enrollment}, {name: details.name}, function(
            err,result) {
            if (err) {
              res.json(err);
            } else {
            //   res.json(result);
            }
        });
        const log = new Log({
            createdAt: current_date_time,
            action: "Updated "+ details.enrollment +" Name to "+details.name,
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });
       }
       if(details.contact) {
        Student.updateOne({username: details.enrollment}, {contact: details.contact}, function(
            err,result) {
            if (err) {
              res.json(err);
            } else {
            //   res.json(result);
            }
        });
        const log = new Log({
            createdAt: current_date_time,
            action: "Updated "+ details.enrollment +" Contact to "+details.contact,
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });
       }
       else res.json("doesn't exist");
    }
    // else console.log("wrong2");
}

const stuAccess = async (req,res) => {
    const details = req.body;
    const enrollExists = await Student.findOneAndUpdate(
        {username: details.enrollment},
        {access: details.access},
        {new: true});
    if(enrollExists) {
         res.status(200).json(enrollExists);
        var current_date_time = currDateTime(currentTime);
        
        const log = new Log({
            createdAt: current_date_time,
            action: "Modified " + details.enrollment + " account access",
            role: "ADMIN" 
        });

        log.save(function(err){
            if(err){
                console.log(err);
            } else {
                // console.log("Updated Logs");
            }
        });
    }
    else return res.status(404).json("Enrollment doesn't exist in Database");
    
}

module.exports = {
    adminLogin, 
    studentCoursesummary,
    studentdroppedcourses,
    facultyList,
    logReport,
    notifications,
    updateProfile,
    stuAccess
  };