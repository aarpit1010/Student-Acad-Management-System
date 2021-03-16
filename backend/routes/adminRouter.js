const adminRouter = require("express").Router();
const {
    adminLogin
  } = require("../controllers/adminController");


adminRouter.post('/login', adminLogin);

module.exports = adminRouter;

