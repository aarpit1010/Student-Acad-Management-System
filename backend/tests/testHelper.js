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
    let student = new Student({
      _id: new mongoose.mongo.ObjectID(),
      ...studentData,
      password: passwordHash,
    });
    // await student.save();
    const token = jwt.sign(
      {
        id: student._id,
      },
      process.env.TOKEN_SECRET
    );
    return {student,token};
};

  module.exports = {
    loginStudent,
    initialStudents,
    fakeToken,
    invalidToken,
  };