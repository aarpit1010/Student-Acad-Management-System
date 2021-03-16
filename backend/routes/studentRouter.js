const router = require("express").Router();
const  verify = require('../controllers/verifyToken');

const {
    studentRegister,
    studentLogin,
    studentTimetable,
    profile
  } = require("../controllers/studentController");


router.post('/register', studentRegister);

router.post('/login', studentLogin);

router.get('/timetable', verify, studentTimetable);

router.get('/profile',verify,profile);
module.exports = router;
