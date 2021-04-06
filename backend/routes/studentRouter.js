const router = require("express").Router();
const verify = require("../controllers/verifyToken");

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
  requestCert,
  courseReg,
  regcourses,
  // studentProfileAll,
  displaycourses,
  displayRegnCourses,
  displayattendance,
  getFees,
  updateFees,
} = require("../controllers/studentController");

router.post("/register", studentRegister);

router.post("/login", studentLogin);

router.get("/timetable", verify, studentTimetable);

router.get("/profile", verify, studentProfile);

// router.get("/profile-all", verify, studentProfileAll);

router.get("/marks", verify, studentMarks);

router.get("/droppedcourses", verify, droppedCourses);

router.get("/viewFacultyList", verify, viewFaculty);

router.post("/send", mailsend);

router.get("/notifications", verify, notifications);

router.get("/viewcalendar", verify, viewcal);

router.get("/viewcertificate", verify, viewcert);

router.post("/reqDoc", verify, requestCert);

router.get("/courseregn", verify, courseReg);

router.post("/courseregn/opted", verify, regcourses);

router.get("/semwise_courses", verify, displaycourses);

router.get("/courseregn/opted/list", verify, displayRegnCourses);

router.get("/attendance", verify, displayattendance);

router.get("/feestatus", verify, getFees);

router.post("/feestatus/update", verify, updateFees);

module.exports = router;
