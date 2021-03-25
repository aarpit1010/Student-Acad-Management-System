const router = require("express").Router();
const  verify = require('../controllers/verifyToken');

const {
    studentRegister,
    studentLogin,
    studentTimetable,
    studentProfile,
    studentMarks,
    droppedCourses,
    viewFaculty,
    mailsend,
    notifications
  } = require("../controllers/studentController");


router.post('/register', studentRegister);

router.post('/login', studentLogin);

router.get('/timetable', verify, studentTimetable);

router.get('/profile',verify, studentProfile);

router.get('/marks', verify, studentMarks);

router.get('/droppedcourses', verify, droppedCourses);

router.get('/viewFacultyList', verify, viewFaculty);

router.post('/send',mailsend);

router.get('/notifications',verify,notifications);

module.exports = router;
