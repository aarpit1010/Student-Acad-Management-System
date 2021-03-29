const adminRouter = require("express").Router();
const admin_verify = require("../controllers/admin_verifyToken");

const {
    adminLogin,
    studentProfileAll,
    studentCoursesummary,
    studentdroppedcourses,
    facultyList,
    logReport,
    notifications,
    displayNotifs,
    updateProfile,
    stuAccess,
} = require("../controllers/adminController");

adminRouter.post("/login", adminLogin);

adminRouter.get("/profile-all", admin_verify, studentProfileAll);

adminRouter.post("/updatestudentprofile", updateProfile);

adminRouter.post("/studentmarks", admin_verify, studentCoursesummary);

adminRouter.post("/studentdroppedcourses", admin_verify, studentdroppedcourses);

adminRouter.post("/addFaculty", admin_verify, facultyList);

adminRouter.get("/generatelogs", admin_verify, logReport);

adminRouter.post("/notifications", admin_verify, notifications);

adminRouter.get("/notifications/view", admin_verify, displayNotifs);

adminRouter.post("/disableUser", admin_verify, stuAccess);

module.exports = adminRouter;
