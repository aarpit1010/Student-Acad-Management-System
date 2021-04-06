const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  username: {
    type: String,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  contact: {
    type: Number,
    required: true,
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
  creation_date: {
    type: Date,
    default: Date.now,
  },
  last_login_date: {
    type: Date,
    default: Date.now,
  },
  current_course: {
    type: Array,
  },
  registered_course: {
    type: Array,
  },
  access: {
    type: Boolean,
    default: true,
  },
  fees_paid: {
    type: Boolean,
    default: false,
  },
  has_opted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.statics.login = function login(id, callback) {
  return this.findByIdAndUpdate(
    id,
    { $set: { last_login_date: Date.now() }, new: true },
    callback
  );
};

// Sets the created_at parameter equal to the current time
studentSchema.pre("save", function (next) {
  now = new Date();
  this.last_login_date = now;
  if (!this.creation_date) {
    this.creation_date = now;
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
