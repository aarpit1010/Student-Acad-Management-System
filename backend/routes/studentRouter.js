const router = require("express").Router();
const  verify = require('../controllers/verifyToken');

const {
    studentRegister,
    studentLogin,
    studentTimetable
  } = require("../controllers/studentController");


router.post('/register', studentRegister);

router.post('/login', studentLogin);

// router.post('/timetable', studentTimetable);
router.get('/timetable', verify, studentTimetable);

module.exports = router;
