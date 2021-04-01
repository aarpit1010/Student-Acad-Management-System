const adminRouter = require("express").Router();
const admin_verify = require("../controllers/admin_verifyToken");

const {
    adminLogin,
    studentProfileAll,
    studentCoursesummary,
    studentdroppedcourses,
    facultyList,
    Faculty,
    logReport,
    notifications,
    displayNotifs,
    mailsend,
} = require("../controllers/adminController");

adminRouter.post("/login", adminLogin);

adminRouter.get("/profile-all", admin_verify, studentProfileAll);

// adminRouter.post("/updatestudentprofile", updateProfile);

adminRouter.post("/updatestudentmarks", admin_verify, studentCoursesummary);

adminRouter.post("/studentdroppedcourses", admin_verify, studentdroppedcourses);

adminRouter.post("/addFaculty", admin_verify, facultyList);

adminRouter.get("/addFaculty/viewlist", admin_verify, Faculty);

adminRouter.get("/generatelogs", admin_verify, logReport);

adminRouter.post("/notifications", admin_verify, notifications);

adminRouter.get("/notifications/view", admin_verify, displayNotifs);

adminRouter.get("/send", admin_verify, mailsend);

module.exports = adminRouter;
