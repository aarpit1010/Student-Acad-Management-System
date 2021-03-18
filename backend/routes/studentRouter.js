const router = require("express").Router();
const verify = require("../controllers/verifyToken");

const {
    studentRegister,
    studentLogin,
    studentTimetable,
    studentProfile,
} = require("../controllers/studentController");

router.post("/register", studentRegister);

router.post("/login", studentLogin);

router.get("/timetable", verify, studentTimetable);

router.get("/profile", verify, studentProfile);

module.exports = router;
