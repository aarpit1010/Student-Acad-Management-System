const express = require("express");
const studentRouter = express.Router();

const {studentRegister, 
    studentLogin, 
    studentTimetable} = 
    require("../controllers/studentController");

studentRouter.post(
    "/register",
    studentRegister
);

studentRouter.post(
    "/login",
    studentLogin
);

studentRouter.get(
    "/timetable",
    studentTimetable
);

module.exports = studentRouter;