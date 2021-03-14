const mongoose = require("mongoose");
const encrypt=require("mongoose-encryption");

mongoose.connect("mongodb://localhost:27017/userDB",{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

module.exports = db;