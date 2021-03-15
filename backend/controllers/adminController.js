const Student = require("../models/Student.js")
const Admin = require("../models/Admin.js")
const Timetable = require("../content/timetable.js")
const mongoose = require('mongoose');
const encrypt=require("mongoose-encryption");


const adminLogin = function (req, res) {
    const username=req.body.username;
    const password=req.body.password;
    if(username=="admin"&&password=="1234")
    {
        res.render("dashboard");
    }
    else
    {
        console.log("error");
    }
};

module.exports = adminLogin;