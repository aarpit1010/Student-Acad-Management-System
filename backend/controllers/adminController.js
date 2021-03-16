const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const adminLogin = function (req, res) {
    const username=req.body.username;
    const password=req.body.password;
    if(username=="admin"&&password=="1234")
    {
        // res.render("dashboard");
        res.json({message:"admin login successful"});
    }
    else
    {
        res.status(400).json("Invalid Credentials!");
    }
};

module.exports = {
    adminLogin
  };