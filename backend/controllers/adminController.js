const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { course_summary, droppedcourses, notifs, attend } = require("../model/marks");
const faculty_list = require("../model/facultyList");
const { currDateTime, addtoLog } = require("../utils/logReport");
const Student = require("../model/Student");
const Courses = require("../utils/courses");
const Log = require("../model/log");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

var currentTime = new Date();

const adminLogin = function (req, res) {
    const username = req.body.email;
    const password = req.body.password;
    if (username == "authority.iiita@gmail.com" && password == "1234") {

        var action_string = "Successfully Logged In";
        addtoLog(action_string, "ADMIN", currentTime);

        const admintoken = jwt.sign(
            {
                _id: password,
            },
            process.env.TOKEN_SECRET
        );
        res.header("admin-auth-token", admintoken).json(admintoken);
    } else {
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
            Courses.findCourse("courses", {}, function (err2, docs2) {
                if (err2) res.json(err);
                res.status(200).json({
                    enrolled_courses: docs2,
                    student,
                    marks: docs,
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json("Invalid Request!");
    }
};

const studentCoursesummary = async (req, res) => {
    // const coursesummary = new course_summary(req.body);

    var enrollmentExist = await course_summary.findOne({
        enrollment: req.body.profileData.enrollment,
    });

    if(!enrollmentExist) 
    {
        var  new_enroll=new course_summary();
        new_enroll.enrollment=req.body.profileData.enrollment;
        enrollmentExist=new_enroll;
        enrollmentExist.save();
    }      
    else{var c=enrollmentExist.semester_marks.length;
    for(i=0;i<c;i++) {
        enrollmentExist.semester_marks.pop();
    }
    for(let i=0;i<req.body.enrolledCourseData.length;i++) {
        enrollmentExist.semester_marks.push(req.body.enrolledCourseData[i]);   
    }
    enrollmentExist.save();
            

    var stuExists = await Student.findOne({
        enrollment: req.body.profileData.enrollment,
    });
    // console.log(stuExists);
    if(req.body.profileData.name != null)
        stuExists.name = req.body.profileData.name;
    if(req.body.profileData.contact != null)
        stuExists.contact = req.body.profileData.contact;
    if(req.body.profileData.access != null)
        stuExists.access = req.body.profileData.access;

    stuExists.save();

    res.status(200).json({
        profile: stuExists,
        marks: enrollmentExist.semester_marks,
    });}
    
    var action_string = "Added/Updated " 
                        + enrollmentExist.enrollment
                        + " Marks & Attendance";
    addtoLog(action_string, "ADMIN", currentTime);
};

const studentdroppedcourses = async (req, res) => {
    const droppedCourses = new droppedcourses(req.body);

    const enrollmentExist = await droppedcourses.findOne({
        enrollment: req.body.enrollment,
    });
    const marksExist = await course_summary.findOne({
        enrollment: req.body.enrollment,
    });

    // var current_date_time = currDateTime(currentTime);

    if (enrollmentExist) {
        enrollmentExist.dropped_courses = [];
        for (let i = 0; i < req.body.dropped_courses.length; i++) {
            enrollmentExist.dropped_courses.push(req.body.dropped_courses[i]);
        }
        enrollmentExist.save();

        for(let i = 0; i < enrollmentExist.dropped_courses.length; i++) {
            var subj = enrollmentExist.dropped_courses[i];
            marksExist.semester_marks = marksExist.semester_marks.filter(
                x => x.course_ID != subj
            );
        }
        res.status(400).json(enrollmentExist.dropped_courses);
        marksExist.save();

        var action_string = "Updated List of Dropped Courses for "
                            + enrollmentExist.enrollment;
        addtoLog(action_string, "ADMIN", currentTime);

    } else {

        var enroll = new droppedcourses();
        enroll.enrollment = req.body.enrollment;
        for (let i = 0; i < req.body.dropped_courses.length; i++) {
            enroll.dropped_courses.push(req.body.dropped_courses[i]);
        }
        enroll.save();

        for(let i = 0; i < enroll.dropped_courses.length; i++) {
            var subj = enroll.dropped_courses[i];
            marksExist.semester_marks = marksExist.semester_marks.filter(
                x => x.course_ID != subj
            );
        }
        // console.log(marksExist);
        // console.log(enroll.dropped_courses);
        marksExist.save();
        res.status(200).json(enroll.dropped_courses);

        var action_string = "Added List of Dropped Courses for "
                            + enroll.enrollment;
        addtoLog(action_string, "ADMIN", currentTime);
    }
};

const facultyList = async (req, res) => {
    const addFaculty = new faculty_list(req.body);

    const currBranch = req.body.branch;
    const currSemester = req.body.semester;
    const currSection = req.body.section;

    const profExists = await faculty_list.findOne({
        branch: currBranch,
        semester: currSemester,
        section: currSection,
    });
    // var current_date_time = currDateTime(currentTime);

    if (profExists) {
        for (let i = 0; i < req.body.faculty.length; i++) {
            profExists.faculty.push(req.body.faculty[i]);
        }
        profExists.save();

        var action_string = "Added Faculty for existing List";
        addtoLog(action_string, "ADMIN", currentTime);

        return res.status(200).json(profExists);
    
    } else {
        addFaculty.save();

        var action_string = "Added Faculty list";
        addtoLog(action_string, "ADMIN", currentTime);

        return res.status(200).json(addFaculty);
    }
};

const Faculty = async (req, res) => {
    const facExists = await faculty_list.find({});
    if (facExists) res.status(200).json(facExists);
};

const logReport = async (req, res) => {
    const logExists = await Log.find({});
    if (logExists) res.status(200).json(logExists);
};

const notifications = async (req, res) => {
    const Notification = new notifs(req.body);
    const enrollmentExist = await notifs.findOne({
        enrollment: req.body.enrollment.toLowerCase(),
    });
    if (enrollmentExist) {
        var notif_date_time = currDateTime(currentTime);
        var obj = {
            message: req.body.notifs_arr[0].message,
            sent_time: notif_date_time,
        };
        enrollmentExist.notifs_arr.push(obj);
        enrollmentExist.save();

        res.status(200).json(enrollmentExist.notifs_arr);

        var action_string = "Sent another notification to "
                             + enrollmentExist.enrollment;
        addtoLog(action_string, "ADMIN", currentTime);

    } else {
        var enroll = new notifs();
        enroll.enrollment = req.body.enrollment;

        var notif_date_time = currDateTime(currentTime);

        var obj = {
            message: req.body.notifs_arr[0].message,
            sent_time: notif_date_time,
        };
        enroll.notifs_arr.push(obj);

        enroll.save();
        res.status(201).json(enroll.notifs_arr);

        var action_string = "Sent Notifications to "
                             + enroll.enrollment;
        addtoLog(action_string, "ADMIN", currentTime);
    }
};

const displayNotifs = async (req, res) => {
    const notifsExists = await notifs.find({});
    if (notifsExists) res.status(200).json(notifsExists);
};

const mailsend = (req, res) => {
    const transporter = nodemailer.createTransport(
        sendGridTransport({
            auth: {
                api_key: process.env.mail_sender,
            },
        })
    );
    const { name, email, message, subject } = req.body;
    transporter
        .sendMail({
            from: "authority.iiita@gmail.com",
            to: email,
            subject: subject,
            html: `<h3>${name}</h3>
    <p>${message}</p>`,
        })
        .then((resp) => {
            res.json({ resp });
        })
        .catch((err) => {
            console.log(err);
        });

    var action_string = "E-Mail Sent by " +
                         name + 
                         " to : " + email;
    addtoLog(action_string, "Student", currentTime);
};

const Attendance = async (req,res) =>{
    const enrollmentExist= await attend.findOne({
        enrollment: req.body.enrollment,
    });
    var c=enrollmentExist.subjects_attend.length;
    for(i=0;i<c;i++)
    {
    enrollmentExist.subjects_attend.pop();
    }
    for(let i=0;i<req.body.subjects_attend.length;i++)
    {
        enrollmentExist.subjects_attend.push(req.body.subjects_attend[i]);   
    }
    enrollmentExist.save();
    res.status(200).json(enrollmentExist);
}

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
    mailsend,
    Attendance
  };