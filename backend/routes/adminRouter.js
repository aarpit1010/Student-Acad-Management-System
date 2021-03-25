const adminRouter = require("express").Router();
const  admin_verify = require('../controllers/admin_verifyToken');

const {
  adminLogin, 
  studentCoursesummary,
  studentdroppedcourses,
  facultyList,
  logReport,
  notifications
} 
= require("../controllers/adminController");



adminRouter.post('/login', adminLogin);

adminRouter.post('/studentmarks', admin_verify, studentCoursesummary);

adminRouter.post('/studentdroppedcourses', admin_verify, studentdroppedcourses);

adminRouter.post('/addFaculty', admin_verify, facultyList);

adminRouter.post('/generatelogs', admin_verify, logReport);

adminRouter.post('/notifications', admin_verify, notifications);


module.exports = adminRouter;

