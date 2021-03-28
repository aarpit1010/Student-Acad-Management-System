const adminRouter = require("express").Router();
const  admin_verify = require('../controllers/admin_verifyToken');

const {
  adminLogin, 
  studentCoursesummary,
  studentdroppedcourses,
  facultyList,
  logReport,
  notifications,
  updateProfile,
  stuAccess
} 
= require("../controllers/adminController");



adminRouter.post('/login', adminLogin);

adminRouter.get('/updatestudentprofile', updateProfile);

adminRouter.post('/studentmarks', admin_verify, studentCoursesummary);

adminRouter.post('/studentdroppedcourses', admin_verify, studentdroppedcourses);

adminRouter.post('/addFaculty', admin_verify, facultyList);

adminRouter.post('/generatelogs', admin_verify, logReport);

adminRouter.post('/notifications', admin_verify, notifications);

adminRouter.post('/disableUser', admin_verify, stuAccess);


module.exports = adminRouter;

