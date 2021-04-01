let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();
    Log = require("../model/log");
    Student = require("../model/Student");

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
let {calendar,certificate} = require('../model/upload');

router.post('/uploadcertificate', upload.single('certpdf'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const chk = url + '/public/' + req.file.filename;

    var enroll_no = req.body.enrollment;
    var cert_type = req.body.type;
    const enrollExists = await Student.findOne({enrollment: enroll_no});

    var current_date_time = currDateTime(currentTime);

    if(enrollExists) {
        const pdfExists = await certificate.findOne({enrollment: enroll_no});
        if (!pdfExists) {
            var obj = {
                type: cert_type,
                link: chk,
            };
            var arr = [];
            arr.push(obj);
            // console.log(obj); 
            // console.log(arr);
            const user = new certificate({
                _id: new mongoose.Types.ObjectId(),
                enrollment: enrollExists.enrollment,
                certpdf: arr,
            });
            // console.log(user);
            user.save().then(result => {
                res.status(201).json({
                    _id: result._id,
                    enrollment: enrollExists.enrollment,
                    certpdf: result.certpdf
                })
            }).catch(err => {
                console.log(err),
                    res.status(500).json({
                        error: err
                    });
            })

            const log = new Log({
                createdAt: current_date_time,
                action: "Uploaded Student " +  cert_type +
                 " Certificate for " + enrollExists.enrollment,
                role: "ADMIN" 
            });
        
            log.save(function(err){
                if(err){
                    console.log(err);
                } else {
                    // console.log("Updated Logs");
                }
            });
        }

        else {
            var cert_id = pdfExists._id;
            var obj = {
                type: cert_type,
                link: chk,
            };
            // console.log(obj);
            certificate.findByIdAndUpdate(cert_id, {$push:
                {
                    certpdf: obj,
                }},
                {new: true}, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating file!");
                    }
                    res.status(201).json(doc);
            });

            const log = new Log({
                createdAt: current_date_time,
                action: "Added Student " +  cert_type +
                " Certificate for " + enrollExists.enrollment,
                role: "ADMIN" 
            });
        
            log.save(function(err){
                if(err){
                    console.log(err);
                } else {
                    // console.log("Updated Logs");
                }
            });
        }
    }    
});

router.get("/", (req, res, next) => {
    certificate.find().then(data => {
        res.status(200).json({
            message: "Student Certificate Uploaded Successfully!",
            users: data
        });
    });
});

module.exports = router;