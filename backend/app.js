const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import routes
const studentAuth = require("./routes/studentRouter");
const adminAuth = require("./routes/adminRouter");
const cors = require("cors");
const addAcadCal = require("./routes/acadCalRoutes");
const addStuCert = require("./routes/reqCertificate");
const  admin_verify = require("./controllers/admin_verifyToken");
const nodemailer =require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const fs = require("fs-extra");

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true },
    () => console.log("Connected to MongoDB")
); 

// Middleware
app.use(express.json());
app.use(cors());
app.use("/admin", adminAuth);
app.use("/student", studentAuth);

app.use("/public", express.static("public"));

app.use("/cal", admin_verify, addAcadCal);

app.use("/cert", admin_verify, addStuCert);

module.exports = app;