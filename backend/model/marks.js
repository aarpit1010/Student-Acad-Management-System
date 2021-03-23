const mongoose = require("mongoose");
const Student = require("./Student");
// const findOrCreate = require('mongoose-findorcreate')

const coursesummary = new mongoose.Schema({
    enrollment:{
        type: mongoose.Schema.Types.String, ref: 'Student'
    },
    semester_marks:
      {
        c1:[Number,Number,Number,Number,Number,Number],
        c2:[Number,Number,Number,Number,Number,Number],
        c3:[Number,Number,Number,Number,Number,Number]

      }, 
    
});

const dropped_courses = new mongoose.Schema({
  enrollment:{
    type: mongoose.Schema.Types.String, ref: 'Student'
  },
  dropped_courses:[String]
});


// coursesummary.plugin(findOrCreate);

const course_summary = mongoose.model("coursesummary", coursesummary);
const droppedcourses= mongoose.model("dropped_courses",dropped_courses);
module.exports = {course_summary,droppedcourses};