const router = require("express").Router();
const {
    studentRegister,
    studentLogin,
    studentTimetable
  } = require("../controllers/studentController");


router.post('/register', studentRegister);

router.post('/login', studentLogin);

router.post('/timetable', studentTimetable);

module.exports = router;
