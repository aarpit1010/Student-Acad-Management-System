const mongoose = require("mongoose");
const Student = require("./Student");
// const findOrCreate = require('mongoose-findorcreate')

const coursesummary = new mongoose.Schema({
    enrollment:{
        type: mongoose.Schema.Types.String, ref: 'Student'
    },
    semester_marks:
      [
        {
          c1: Number,
          c2: Number,
          c3: Number,
          total: Number,
          gpa: Number
        },
        {
          c1: Number,
          c2: Number,
          c3: Number,
          total: Number,
          gpa: Number
        },
        {
          c1: Number,
          c2: Number,
          c3: Number,
          total: Number,
          gpa: Number
        },
        {
          c1: Number,
          c2: Number,
          c3: Number,
          total: Number,
          gpa: Number
        },
        {
          c1: Number,
          c2: Number,
          c3: Number,
          total: Number,
          gpa: Number
        },
        {
          c1: Number,
          c2: Number,
          c3: Number,
          total: Number,
          gpa: Number
        }
      ],
    attendance:
      [
        {
          daysout0f90: Number
        },
        {
          daysout0f90: Number
        },
        {
          daysout0f90: Number
        },
        {
          daysout0f90: Number
        },
        {
          daysout0f90: Number
        },
        {
          daysout0f90: Number
        }

      ]
    
});

const dropped_courses = new mongoose.Schema({
  enrollment:{
    type: mongoose.Schema.Types.String, ref: 'Student'
  },
  dropped_courses:[String]
});

const notification = new mongoose.Schema({
  enrollment:{
    type: mongoose.Schema.Types.String, ref: 'Student'
  },
  notifs_arr:[
    {
    message: String,
    sent_time: String
   }
]
});

// coursesummary.plugin(findOrCreate);

const course_summary = mongoose.model("coursesummary", coursesummary);
const droppedcourses= mongoose.model("dropped_courses",dropped_courses);
const notifs= mongoose.model("notification",notification);

module.exports = {course_summary,droppedcourses,notifs};