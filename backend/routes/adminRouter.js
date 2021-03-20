const adminRouter = require("express").Router();
const  admin_verify = require('../controllers/admin_verifyToken');

const {
    adminLogin, studentCoursesummary
  } = require("../controllers/adminController");


adminRouter.post('/login', adminLogin);

adminRouter.get('/studentmarks', admin_verify, studentCoursesummary);

module.exports = adminRouter;

