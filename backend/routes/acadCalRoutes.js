let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();
    Log = require("../model/log");

const { v4: uuidv4 } = require('uuid');
uuidv4();


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
let User = require('../model/acadCalendar');

router.post('/uploadfile', upload.single('calpdf'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        calpdf: url + '/public/' + req.file.filename
    });

    const chk = url + '/public/' + req.file.filename;
    
    var cal_id = "605b7f3f595e855a68f57fe2";

    User.findByIdAndUpdate(cal_id, {$set:
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

    now = new Date();
    var current_date_time = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear()
        + '    '+ now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    
    const log = new Log({
        createdAt: current_date_time,
        action: "Added/Updated Academic Calendar",
        role: "ADMIN" 
    });

    log.save(function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Updated Logs");
        }
    });

})

router.get("/", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "Academic Calendar Uploaded Successfully!",
            users: data
        });
    });
});

module.exports = router;