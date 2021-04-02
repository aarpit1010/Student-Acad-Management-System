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
          course_ID:{type:String,default:""},
          course_Name:{type:String,default:""},
          marks:{
          c1:{type:Number,default:0},
          c2: {type:Number,default:0},
          c3:{type:Number,default:0},
          total: {type:Number,default:0},
          gpa:{type:Number,default:0}
          }
        },
        {
          course_ID:{type:String,default:""},
          course_Name:{type:String,default:""},
          marks:{
          c1:{type:Number,default:0},
          c2: {type:Number,default:0},
          c3:{type:Number,default:0},
          total: {type:Number,default:0},
          gpa:{type:Number,default:0}
          }
        },
        {
          course_ID:{type:String,default:""},
          course_Name:{type:String,default:""},
          marks:{
          c1:{type:Number,default:0},
          c2: {type:Number,default:0},
          c3:{type:Number,default:0},
          total: {type:Number,default:0},
          gpa:{type:Number,default:0}
          }
        },
        {
          course_ID:{type:String,default:""},
          course_Name:{type:String,default:""},
          marks:{
          c1:{type:Number,default:0},
          c2: {type:Number,default:0},
          c3:{type:Number,default:0},
          total: {type:Number,default:0},
          gpa:{type:Number,default:0}
          }
        },
        {
          course_ID:{type:String,default:""},
          course_Name:{type:String,default:""},
          marks:{
          c1:{type:Number,default:0},
          c2: {type:Number,default:0},
          c3:{type:Number,default:0},
          total: {type:Number,default:0},
          gpa:{type:Number,default:0}
          }
        },
        {
          course_ID:{type:String,default:""},
          course_Name:{type:String,default:""},
          marks:{
          c1:{type:Number,default:0},
          c2: {type:Number,default:0},
          c3:{type:Number,default:0},
          total: {type:Number,default:0},
          gpa:{type:Number,default:0}
          }
        }
      ]
});
const attendance = new mongoose.Schema({
   enrollment :{
    type: mongoose.Schema.Types.String, ref: 'Student' 
   },
   subjects_attend :[
     { course_ID:{type:String,default:""},
       course_Name:{type:String,default:""},
       daysoutof90:{type:Number,default:0}
     },
     { course_ID:{type:String,default:""},
       course_Name:{type:String,default:""},
       daysoutof90:{type:Number,default:0}
     },
     { course_ID:{type:String,default:""},
       course_Name:{type:String,default:""},
       daysoutof90:{type:Number,default:0}
     },
     { course_ID:{type:String,default:""},
       course_Name:{type:String,default:""},
       daysoutof90:{type:Number,default:0}
     },
     { course_ID:{type:String,default:""},
       course_Name:{type:String,default:""},
       daysoutof90:{type:Number,default:0}
     },
     { course_ID:{type:String,default:""},
       course_Name:{type:String,default:""},
       daysoutof90:{type:Number,default:0}
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
const attend =mongoose.model("attendance",attendance);
module.exports = {course_summary,droppedcourses,notifs,attend};