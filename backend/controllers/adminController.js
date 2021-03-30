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

const studentProfileAll = async (req, res) => {
    try {
        const student = await Student.find();
        course_summary.find({}, function (err1, docs) {
            if (err1) {
                return res.status(404).json("NOT FOUND");
            }
            // Courses.findCourse("courses", {}, function (err2, docs2) {
                // if (err2) res.json(err);
                res.status(200).json({
                    enrolled_courses: docs,
                    student,
                    marks: docs,
                });
            // });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json("Invalid Request!");
    }
};

const studentCoursesummary = async (req,res) => {
   // const coursesummary = new course_summary(req.body);
    
    var  enrollmentExist = await course_summary.findOne({
         enrollment : req.body.profileData.enrollment
        });

    if(!enrollmentExist) {
        var  new_enroll=new course_summary();
        new_enroll.enrollment=req.body.profileData.enrollment;
        enrollmentExist=new_enroll;
    }      

    var c=enrollmentExist.semester_marks.length;

    for(i=0;i<c;i++) {
        enrollmentExist.semester_marks.pop();
    }

    for(i=0;i<req.body.enrolledCourseData.length;i++) {
        enrollmentExist.semester_marks.push(
            req.body.enrolledCourseData[i]);   
    }

    enrollmentExist.save();

    var stuExists = await Student.findOne({
        enrollment: req.body.profileData.enrollment
    });

    stuExists.name = req.body.profileData.name;
    stuExists.contact = req.body.profileData.contact;
    stuExists.access = req.body.profileData.access;

    stuExists.save();
            
    res.status(200).json({
        profile:stuExists,
        marks:enrollmentExist.semester_marks
    });
    

    // var current_date_time = currDateTime(currentTime);
    
    // const log = new Log({
    //     createdAt: current_date_time,
    //     action: "Added/Updated "+enrollmentExist.enrollment+" Marks & Attendance",
    //     role: "ADMIN" 
    // });

    // log.save(function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         // console.log("Updated Logs");
    //     }
    // });
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

const Faculty = async (req,res) => {
    const facExists = await faculty_list.find({});
    if(facExists) res.status(200).json(facExists);
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

const displayNotifs = async (req,res) => {
    const notifsExists = await notifs.find({});
    if(notifsExists) res.status(200).json(notifsExists);
};

// const updateProfile = async (req,res) => {
//     const details = req.body;
//     const enrollmentExist = await Student.findOne({ username : details.enrollment});
//     var current_date_time = currDateTime(currentTime);
//     if(enrollmentExist) {
//        if(details.name) {
//         Student.updateOne({username: details.enrollment}, {name: details.name}, function(
//             err,result) {
//             if (err) {
//               res.json(err);
//             } else {
//             //   res.json(result);
//             }
//         });
//         const log = new Log({
//             createdAt: current_date_time,
//             action: "Updated "+ details.enrollment +" Name to "+details.name,
//             role: "ADMIN" 
//         });

//         log.save(function(err){
//             if(err){
//                 console.log(err);
//             } else {
//                 // console.log("Updated Logs");
//             }
//         });
//        }
//        if(details.contact) {
//         Student.updateOne({username: details.enrollment}, {contact: details.contact}, function(
//             err,result) {
//             if (err) {
//               res.json(err);
//             } else {
//             //   res.json(result);
//             }
//         });
//         const log = new Log({
//             createdAt: current_date_time,
//             action: "Updated "+ details.enrollment +" Contact to "+details.contact,
//             role: "ADMIN" 
//         });

//         log.save(function(err){
//             if(err){
//                 console.log(err);
//             } else {
//                 // console.log("Updated Logs");
//             }
//         });
//        }
//        else res.json("doesn't exist");
//     }
//     // else console.log("wrong2");
// }

// const stuAccess = async (req,res) => {
//     const details = req.body;
//     const enrollExists = await Student.findOneAndUpdate(
//         {username: details.enrollment},
//         {access: details.access},
//         {new: true});
//     if(enrollExists) {
//          res.status(200).json(enrollExists);
//         var current_date_time = currDateTime(currentTime);
        
//         const log = new Log({
//             createdAt: current_date_time,
//             action: "Modified " + details.enrollment + " account access",
//             role: "ADMIN" 
//         });

//         log.save(function(err){
//             if(err){
//                 console.log(err);
//             } else {
//                 // console.log("Updated Logs");
//             }
//         });
//     }
//     else return res.status(404).json("Enrollment doesn't exist in Database");
    
// }

module.exports = {
    adminLogin, 
    studentProfileAll,
    studentCoursesummary,
    studentdroppedcourses,
    facultyList,
    Faculty,
    logReport,
    notifications,
    displayNotifs,
    // updateProfile,
    // stuAccess
  };