const adminRouter = require("express").Router();
const {
    adminLogin, studentCoursesummary
  } = require("../controllers/adminController");


adminRouter.post('/login', adminLogin);

adminRouter.get('/studentmarks', studentCoursesummary);

module.exports = adminRouter;

