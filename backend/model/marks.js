const mongoose = require("mongoose");
const Student = require("./Student");
// const findOrCreate = require('mongoose-findorcreate')

const coursesummary = new mongoose.Schema({
    enrollment:{
        type: mongoose.Schema.Types.String, ref: 'Student'
    },
    semester_marks:[
      {
        c1:[Number,Number,Number,Number,Number,Number],
        c2:[Number,Number,Number,Number,Number,Number],
        c3:[Number,Number,Number,Number,Number,Number]

      }, 
    ]
});

// coursesummary.plugin(findOrCreate);

const course_summary = mongoose.model("coursesummary", coursesummary);
module.exports = course_summary;