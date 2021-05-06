const mongoose = require("mongoose");
const Student = require("../model/Student");
const Log = require("../model/log");
const { course_summary, droppedcourses, notifs } = require("../model/marks");
const viewprof = require("../model/facultyList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { studentRegisterValid, studentLoginValid } = require("../controllers/validation");

const fakeToken = async () => {
    let fakeStudentToken;
    fakeStudentToken = await jwt.sign(
        {
          _id: "15564jhg56789j68",
        },
        process.env.TOKEN_SECRET
      );
      return {
        student: fakeStudentToken,
      };
};
var marksdata={
  profileData: {
      access: false,
      username: "iitiitiit",
      email: "iit2019777@iiita.ac.in",
      semester: "4",
      branch: "IT",
      enrollment: "iiitiitiit"
  },
  enrolledCourseData: [{
      course_ID: "CN",
      course_Name: "Computer Networks",
      marks: {
          c1: 0,
          c2: 0,
          c3: 0,
          total: 0,
          gpa: 0
      }
      
  }, {
      course_ID: "DBMS",
      course_Name: "Database & Management System",
      marks: {
          c1: 0,
          c2: 0,
          c3: 0,
          total: 0,
          gpa: 0
      }
     
  }, {
      
      course_ID: "DAA",
      course_Name: "Design & Analysis of Algorithms",
      marks: {
          c1: 0,
          c2: 0,
          c3: 0,
          total: 0,
          gpa: 0
      }
  }, {
      course_ID: "PPL",
      course_Name: "Principles of Programming Language",
      
      marks: {
          c1: 0,
          c2: 0,
          c3: 0,
          total: 0,
          gpa: 0
      }
  }, {
      course_ID: "SE",
      course_Name: "Software Engineering",
      marks: {
          c1: 0,
          c2: 0,
          c3: 0,
          total: 0,
          gpa: 0
      }
  }]
}
const initialStudents = [
    {
      name: "Default",
      email: "iit2019777@iiita.ac.in",
      section: "B",
      semester: "4",
      password: "password",
      branch: "IT",
      username: "iitiitiit",
      enrollment: "iitiitiit",
      contact: "3478979348",
    },
    {
      name: "Demo",
      email: "iit2019888@iiita.ac.in",
      section: "B",
      semester: "2",
      password: "password2",
      branch: "IT",
    },
  ];
const facultyData ={
  section:"B",
  branch:"IT",
  semester:"2",
  faculty:[{
    
    courseid: "DST",
    coursename: "Data Structure",
    facultyname: "Dr. Javed"
}]
}
const invalidToken = function (id) {
  const token = jwt.sign(
    {
      id: id,
      // pswd: "password",
    },
    process.env.TOKEN_SECRET
  );
  return token;
};

const loginStudent = async (studentData) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(studentData.password, salt);
    let student = await Student.find({});
     
    // await student.save();
    const token = jwt.sign(
      {
        _id: student[0]._id,
      },
      process.env.TOKEN_SECRET
    );
    return token;
};


const sendMail = [
  {
    name: "Demo",
    email: "iit2019888@iiita.ac.in",
    subject: "Test Mail - 1",
    message: "SOme random input outpur query",
  }
];

  module.exports = {
    loginStudent,
    initialStudents,
    fakeToken,
    invalidToken,
    marksdata,
    facultyData
  };