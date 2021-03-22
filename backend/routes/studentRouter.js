const router = require("express").Router();
const  verify = require('../controllers/verifyToken');

const {
    studentRegister,
    studentLogin,
    studentTimetable,
    studentProfile,
    studentMarks
  } = require("../controllers/studentController");


router.post('/register', studentRegister);

router.post('/login', studentLogin);

router.get('/timetable', verify, studentTimetable);

router.get('/profile',verify, studentProfile);

router.get('/marks', verify, studentMarks);

module.exports = router;
