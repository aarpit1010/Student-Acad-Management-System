const mongoose = require("mongoose");
const encrypt=require("mongoose-encryption");

const studentSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact:{ 
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
  });
  
const secret="itisasecret";
studentSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
  
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;