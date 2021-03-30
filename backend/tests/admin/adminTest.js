const app = require("../../app");
const Student = require("../../models/Student");
const mongoose = require("mongoose");
const Student = require("../model/Student");
const Log = require("../model/log");
const { course_summary, droppedcourses, notifs } = require("../model/marks");
const viewprof = require("../model/facultyList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { studentRegisterValid, studentLoginValid } = require("./validation");

const {
    loginStudent,
    initialStudents,
    fakeToken,
} = require("../testHelper");


const api = supertest(app);

let student;

beforeEach(async () => {
    await Student.deleteMany({});
    student = await loginStudent(initialStudents[0]);
  });