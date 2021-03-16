const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import routes
const studentAuth = require('./routes/studentRouter');
const adminAuth = require('./routes/adminRouter');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, 
    { useUnifiedTopology: true ,
    useNewUrlParser: true}, 
    () => console.log('Connected to MongoDB')
);  

// Middleware
app.use(express.json());

app.use('/admin', adminAuth);
app.use('/student', studentAuth);

app.listen(3001, () => console.log("Server Up and Running"));