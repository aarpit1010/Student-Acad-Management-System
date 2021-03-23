const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import routes
const studentAuth = require('./routes/studentRouter');
const adminAuth = require('./routes/adminRouter');
const cors = require('cors');
const addAcadCal = require('./routes/acadCalRoutes')
fs = require('fs-extra')


dotenv.config();

mongoose.connect(process.env.DB_CONNECT, 
    { useUnifiedTopology: true ,
    useNewUrlParser: true}, 
    () => console.log('Connected to MongoDB')
);  

// Middleware
app.use(express.json());
app.use(cors());
app.use('/admin', adminAuth);
app.use('/student', studentAuth);

app.use('/public', express.static('public'));

app.use('/cal', addAcadCal)

app.listen(3001, () => console.log("Server Up and Running"));