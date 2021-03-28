const router = require("express").Router();
const verify = require("../controllers/verifyToken");
const admin_verify = require("../controllers/admin_verifyToken");

const {
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
    courseReg,
    regcourses,
    studentProfileAll,
} = require("../controllers/studentController");

router.post("/register", studentRegister);

router.post("/login", studentLogin);

router.get("/timetable", verify, studentTimetable);

router.get("/profile", verify, studentProfile);
router.get("/profile-all", verify, studentProfileAll);

router.get("/marks", verify, studentMarks);

router.get("/droppedcourses", verify, droppedCourses);

router.get("/viewFacultyList", verify, viewFaculty);

router.post("/send", mailsend);

router.get("/notifications", verify, notifications);

router.get("/viewcalendar", verify, viewcal);

router.get("/viewcertificate", verify, viewcert);

router.get("/courseregn", verify, courseReg);

router.get("/courseregn/opted", verify, regcourses);

module.exports = router;
