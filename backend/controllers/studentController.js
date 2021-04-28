const router = require("express").Router();
const Student = require("../model/Student");
const {
    course_summary,
    droppedcourses,
    notifs,
    attend,
} = require("../model/marks");
const viewprof = require("../model/facultyList");
const Timetable = require("../utils/timetable");
const Courses = require("../utils/courses");
const { currDateTime, addtoLog } = require("../utils/logReport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const { studentRegisterValid, studentLoginValid } = require("./validation");
const { calendar, certificate, Request } = require("../model/upload");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to MongoDB")
);

var currentTime = new Date();

const studentRegister = async (req, res) => {
    try {
        const student = new Student(req.body);
        let givenEmail = req.body.email;
        let givenPassword = req.body.password;

        // validation
        const { error } = studentRegisterValid(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        // check whether user already in database or not
        const emailExist = await Student.findOne({ email: givenEmail });
        // const contactExist = await Student.findOne{( contact: req.body.contact)};
        if (emailExist) return res.status(400).json("Email already exists");

        // hash password
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(givenPassword, salt);
        Courses.findCourse(
            "courses",
            {
                semester: student.semester,
                branch: student.branch,
            },
            function (err, docs2) {
                for (var i = 0; i < docs2[0].course_list.length; i++) {
                    student.current_course.push(docs2[0].course_list[i]);
                }
                student.current_course.sort((a, b) =>
                    a.course_Name > b.course_Name ? 1 : -1
                );

                course_summary.deleteMany({enrollment: req.body.enrollment}, function (err, _) {
                    if (err) {
                        return console.log(err);
                    }
                });
                
                attend.deleteMany({enrollment: req.body.enrollment}, function (err, _) {
                    if (err) {
                        return console.log(err);
                    }
                });

                var new_enroll = new course_summary();
                var new_enroll_attend = new attend();
                new_enroll.enrollment = req.body.enrollment;
                new_enroll_attend.enrollment = req.body.enrollment;
                for (var i = 0; i < docs2[0].course_list.length; i++) {
                    new_enroll.semester_marks.push({
                        course_ID: docs2[0].course_list[i].course_ID,
                        course_Name: docs2[0].course_list[i].course_Name,
                        marks: {
                            c1: 0,
                            c2: 0,
                            c3: 0,
                            total: 0,
                            gpa: 0,
                        },
                    });
                    new_enroll_attend.subjects_attend.push({
                        course_ID: docs2[0].course_list[i].course_ID,
                        course_Name: docs2[0].course_list[i].course_Name,
                        daysoutof90: 0,
                    });
                }

                new_enroll.semester_marks.sort((a, b) =>
                    a.course_Name > b.course_Name ? 1 : -1
                );
                new_enroll_attend.subjects_attend.sort((a, b) =>
                    a.course_Name > b.course_Name ? 1 : -1
                );

                new_enroll.save();
                new_enroll_attend.save();
                // console.log(new_enroll);

                student.save();
                res.status(201).json(student);

                var created_date_time = student.creation_date;
                var current_date_time = student.last_login_date;
                current_date_time = currDateTime(currentTime);
                if (!created_date_time) {
                    created_date_time = currDateTime(currentTime);
                }
                var action_string =
                    "Successfully Registered " + student.username;
                addtoLog(action_string, "Student", currentTime);
            }
        );
    } catch (err) {
        res.status(400).json(err);
    }
};

const studentLogin = async (req, res) => {
    const { email, password } = req.body;

    // validation
    const { error } = studentLoginValid(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // check whether email exists
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json("Email doesn't exists!");
    if (student.access == true) {
        // check password
        const validPass = await bcrypt.compare(password, student.password);
        if (!validPass) return res.status(403).json("Invalid Password!");

        var created_date_time = student.creation_date;
        var current_date_time = student.last_login_date;

        current_date_time = currDateTime(currentTime);
        if (!created_date_time) {
            created_date_time = currDateTime(currentTime);
        }

        var action_string = "Successfully Logged In " + student.username;
        addtoLog(action_string, "Student", currentTime);

        const token = jwt.sign(
            {
                _id: student._id,
            },
            process.env.TOKEN_SECRET
        );
        res.header("auth-token", token).json(token);
    } else return res.status(401).json("Unauthorized Student");
};

const studentTimetable = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");

    Timetable.finder(
        "timetable",
        {
            semester: student.semester,
            section: student.section,
        },
        function (err, docs) {
            res.json({ user: student._id, data: docs });
        }
    );
};

const studentProfile = async (req, res) => {
    try {
        const id = req.student._id;
        const student = await Student.findOne({ _id: id });
        if (!student) res.status(400).json("Student doesn't exist in Database");

        //    Student.findByIdAndUpdate(id, function(err,result){
        const enrollmentExist = await course_summary.findOne({
            enrollment: student.username,
        });

        var curr_sgpi = 0.0;
        var cgpi = 0.0;
        var sgpi = [];
        for (let i = 0; i < student.semester - 1; i++) {
            sgpi.push(Math.random() * 3 + 6);
            cgpi += sgpi[sgpi.length - 1];
        }
        for (let i = 0; i < enrollmentExist.semester_marks.length; i++) {
            curr_sgpi += enrollmentExist.semester_marks[i].marks.gpa;
        }
        curr_sgpi = curr_sgpi / enrollmentExist.semester_marks.length;
        sgpi.push(curr_sgpi);
        cgpi += curr_sgpi;
        cgpi = cgpi / student.semester;

        Courses.findCourse(
            "courses",
            {
                semester: student.semester,
                branch: student.branch,
            },
            function (err, docs) {
                // console.log(docs);
                res.status(200).json({
                    name: student.name,
                    enrollment_no: student.username,
                    email: student.email,
                    contact: student.contact,
                    branch: student.branch,
                    semester: student.semester,
                    section: student.section,
                    enrolled_course: docs[0].course_list.sort((a, b) =>
                        a.course_Name > b.course_Name ? 1 : -1
                    ),
                    sgpi: sgpi,
                    cgpi: cgpi,
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(403).json("Invalid Request!");
    }
};

const studentMarks = async (req, res) => {
    try {
        const id = req.student._id;
        const student = await Student.findOne({ _id: id });
        if (!student) res.status(400).json("Student doesn't exist in Database");
        course_summary.find(
            { enrollment: student.username },
            function (err, docs) {
                if (err) {
                    return res.status(404).json("NOT FOUND");
                }
                res.status(200).json({
                    marks: docs[0].semester_marks,
                    attendance: docs[0].attendance,
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(400).json("DO NOT ACCESS FROM ADMIN");
    }
};

const droppedCourses = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");

    const studentdroppedcourses = await droppedcourses.findOne({
        enrollment: student.username,
    });

    if (!studentdroppedcourses) {
        res.json({ dropped_courses: [] });
    } else {
        res.json({ dropped_courses: studentdroppedcourses.dropped_courses });
    }
};

const viewFaculty = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");

    viewprof.find(
        {
            branch: student.branch,
            semester: student.semester,
            section: student.section,
        },
        function (err, docs) {
            if (err) {
                return res.status(404).json("NOT FOUND");
            }
            // console.log(docs);
            if(docs.length == 0) res.status(201).json("Faculty NOT Available");
            else {
                var verify_course;
                // var verify_course_name = [];
                Courses.findCourse(
                    "courses",
                    {
                        semester: student.semester,
                        branch: student.branch,
                    },
                    function (err, docs2) {
                        verify_course = docs2[0].course_list.sort((a, b) =>
                            a.course_Name > b.course_Name ? 1 : -1
                        );
                        // verify_course_name=docs2[0].course_name.sort();

                        res.status(200).json({
                            // course_id: verify_course_id,
                            // course_name: verify_course_name,
                            faculty: docs[0].faculty.sort((a, b) =>
                                a.coursename > b.coursename ? 1 : -1
                            ),
                        });
                    }
                );
            }
        }
    );
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
            from: "devkarenge@gmail.com",
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

    var action_string = "E-Mail Sent by " + name + " to : " + email;
    addtoLog(action_string, "Student", currentTime);
};

const notifications = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");

    const studentnotifications = await notifs.findOne({
        enrollment: student.username,
    });

    if (!studentnotifications) {
        res.json({ notifs_arr: [] });
    } else {
        res.json({ notifs_arr: studentnotifications.notifs_arr });

        var action_string = "Notifications Seen by " + student.username;
        addtoLog(action_string, "Student", currentTime);
    }
};

const viewcal = async (req, res) => {
    const link = "605b7f3f595e855a68f57fe2";
    const view = await calendar.findOne({ _id: link });
    if (view) return res.status(200).json(view.calpdf);

    // var action_string = "Student "+
    //                     student.enrollment +
    //                     " has viewed the academic Calendar";
    // addtoLog(action_string, "Student", currentTime);
};

const viewcert = async (req, res) => {
    const id = req.student._id;
    const stud = await Student.findOne({ _id: id });
    const chkReq = await Request.findOne({ enrollment: stud.enrollment });
    var certArr = [];
    var firstcertArr = [];
    var certPresent = [];

    if (!chkReq)
        return res.status(200).json("No Request has been sent to Admin");
    else {
        const pdfExists = await certificate.findOne({
            enrollment: stud.enrollment,
        });
        if (pdfExists) {
            for (let i = 0; i < pdfExists.certpdf.length; i++) {
                if (chkReq.reqtype != null) {
                    if (pdfExists.certpdf[i].type == chkReq.reqtype) {
                        firstcertArr.push(pdfExists.certpdf[i]);
                        chkReq.reqtype = null;
                        chkReq.save();
                        break;
                    } else {
                        certPresent.push(pdfExists.certpdf[i]);
                    }
                } else {
                    certArr = pdfExists.certpdf;
                }
            }
            if (certArr.length != 0) res.status(200).json(certArr);
            else {
                if (firstcertArr.length == 0) res.status(200).json(certPresent);
                else res.status(200).json(firstcertArr);
            }
        } else {
            res.status(201).json("ADMIN has NOT yet uploaded doc");
        }

        // var action_string = "Student "+
        //                     student.username +
        //                     " has received Certificate from ADMIN";
        // addtoLog(action_string, "Student", currentTime);
    }
};

const requestCert = async (req, res) => {
    const id = req.student._id;
    const stud = await Student.findOne({ _id: id });
    var studEnroll = stud.enrollment;
    const findEnrollReq = await Request.findOne({
        enrollment: stud.enrollment,
    });
    if (!findEnrollReq) {
        const sendreq = new Request({
            enrollment: stud.enrollment,
            reqtype: req.body.type,
        });
        sendreq.save();
        // console.log(sendreq);
        res.status(200).json(sendreq);
    } else {
        if (findEnrollReq.reqtype != null)
            return res.json("Only 1 request can be sent at a time");
        else {
            findEnrollReq.reqtype = req.body.type;
            findEnrollReq.save();
            res.status(200).json(findEnrollReq);
        }
    }
};

const courseReg = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");
    // console.log(student.registered_course);
    // if(student.registered_course.length == 0) {
    const currSem = student.semester;
    const nextSem = currSem + 1;
    if (currSem != 8) {
        Courses.findCourse(
            "courses",
            {
                semester: nextSem,
                branch: student.branch,
            },
            function (err, docs2) {
                const add_course = docs2[0].course_list.sort((a, b) =>
                    a.course_Name > b.course_Name ? 1 : -1
                );
                // verify_course_name=docs2[0].course_name.sort();
                // console.log(add_course);
                res.status(200).json(add_course);
            }
        );
    }

    var action_string =
        "Student " +
        student.username +
        " views the" +
        " list of courses for the next semester";
    addtoLog(action_string, "Student", currentTime);
    // } else {
    // return res.status(400).json("Already registered for the upcoming Semester");
    // }
};

const regcourses = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");

    if (student.registered_course.length == 0) {
        const currSem = student.semester;
        const nextSem = currSem + 1;

        const course_arr = req.body.course_opted;
        const opted_course_arr = [];
        var add_course;
        var idx;
        Courses.findCourse(
            "courses",
            {
                semester: nextSem,
                branch: student.branch,
            },
            function (err, docs2) {
                // console.log(docs2[0]);
                for (var i = 0; i < course_arr.length; i++) {
                    idx = course_arr[i];
                    add_course = docs2[0].course_list[idx];
                    student.registered_course.push(add_course);
                    opted_course_arr.push(add_course);
                }
                if(student.registered_course.length != 0) 
                    student.has_opted = true; 
                student.save();
                res.status(200).json(opted_course_arr);
                // student.save();
            }
        );

        var action_string =
            "Student " +
            student.username +
            " has selected Courses for upcoming Semester.";
        addtoLog(action_string, "Student", currentTime);
    } else {
        return res
            .status(400)
            .json("Already registered for the upcoming Semester");
    }
};

const displaycourses = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");

    Courses.findCourse("courses", {}, function (err, docs2) {
        res.status(200).json(
            docs2.sort((a, b) => (a.semester > b.semester ? 1 : -1))
        );
    });
};

const displayRegnCourses = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student)
        return res.status(400).json("Student doesn't exist in Database");
    else {
        res.status(200).json({
            opted: student.registered_course,
            hasOpted: student.has_opted,
        });
    }
};

const displayattendance = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");
    else {
        const enrollmentExist = await attend.findOne({
            enrollment: student.username,
        });

        if (enrollmentExist)
            return res.status(200).json(enrollmentExist.subjects_attend);
        else return res.status(400).json("Attendance NOT yet entered by Admin");
    }
};

const getFees = async (req, res) => {
    const id = req.student._id;
    const student = await Student.findOne({ _id: id });
    if (!student) res.status(400).json("Student doesn't exist in Database");
    else {
        res.status(200).json(student.fees_paid);
    }
};

const updateFees = async (req, res) => {
    const id = req.student._id;
    const student = Student.findOneAndUpdate(
        { _id: id },
        { $set: { fees_paid: req.body.fees_paid } },
        { new: true },
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            res.status(200).json(doc.fees_paid);
        }
    );

    var action_string = "Student " + student.username + " has paid the fees";
    addtoLog(action_string, "Student", currentTime);
};

module.exports = {
    studentRegister,
    studentLogin,
    studentTimetable,
    studentProfile,
    studentMarks,
    droppedCourses,
    viewFaculty,
    mailsend,
    notifications,
    viewcal,
    viewcert,
    requestCert,
    courseReg,
    regcourses,
    // studentProfileAll,
    displaycourses,
    displayRegnCourses,
    displayattendance,
    getFees,
    updateFees,
};
