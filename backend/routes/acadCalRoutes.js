let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    // uuidv4 = require('uuid/v4'),
    router = express.Router();

const { v4: uuidv4 } = require('uuid');
uuidv4();


const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
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
    console.log(url);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        // name: req.body.name,
        calpdf: url + '/public/' + req.file.filename
    });
    // console.log(calpdf);
    user.save().then(result => {
        res.status(201).json({
            message: "Academic Calendar Added!",
            calAdded: {
                _id: result._id,
                calpdf: result.calpdf
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});

module.exports = router;