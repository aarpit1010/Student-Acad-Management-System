const mongoose = require("mongoose");
const encrypt=require("mongoose-encryption");

const adminSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  });
  
  const Admin = mongoose.model("Admin", adminSchema);
  module.exports = Admin;