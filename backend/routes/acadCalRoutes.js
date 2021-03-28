let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();
    Log = require("../model/log");

const { v4: uuidv4 } = require('uuid');
uuidv4();

var currentTime = new Date();

function currDateTime(currentTime) {
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;   
  var ISTTime = new Date(currentTime.getTime() + 
    (ISTOffset + currentOffset)*60000);
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var secondsIST = ISTTime.getSeconds();
  var time = hoursIST + ":" + minutesIST + ":" + secondsIST;
  var mnth = currentTime.getMonth() + 1;
  var date_time = currentTime.getDate() + 
    '-' + mnth +
    '-' + currentTime.getFullYear() + ' ' + time;
  return date_time;
}

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        // cb(null, uuidv4() + '-' + fileName)
        cb(null, fileName)
        // cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'application/pdf') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf format allowed!'));
        }
    }
});

// User model
let {calendar, certificate} = require('../model/upload');

router.post('/uploadfile', upload.single('calpdf'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')

    const user = new calendar({
        _id: new mongoose.Types.ObjectId(),
        calpdf: url + '/public/' + req.file.filename
    });
    const chk = url + '/public/' + req.file.filename;
    
    var cal_id = "605b7f3f595e855a68f57fe2";

    calendar.findByIdAndUpdate(cal_id, {$set:
        {calpdf: url + '/public/' + req.file.filename}},
        {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating file!");
            }
            res.status(201).json(doc);
    });

    // user.save().then(result => {
    //     res.status(201).json({
    //         message: "Academic Calendar Added!",
    //         calAdded: {
    //             _id: result._id,
    //             calpdf: result.calpdf
    //         }
    //     })
    // }).catch(err => {
    //     console.log(err),
    //         res.status(500).json({
    //             error: err
    //         });
    // })

    var current_date_time = currDateTime(currentTime);
    
    const log = new Log({
        createdAt: current_date_time,
        action: "Added/Updated Academic Calendar",
        role: "ADMIN" 
    });

    log.save(function(err){
        if(err){
            console.log(err);
        } else {
            // console.log("Updated Logs");
        }
    });

})

router.get("/", (req, res, next) => {
    calendar.find().then(data => {
        res.status(200).json({
            message: "Academic Calendar Uploaded Successfully!",
            users: data
        });
    });
});

module.exports = router;