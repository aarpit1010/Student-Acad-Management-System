const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    username: {
        type: String,
        min: 6
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 255,
      min: 6
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024
    },
    contact:{ 
      type: Number,
      required: true
    },
    section: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    enrollment: {
      type: String,
      required: true,
    },
  });
  
  
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;