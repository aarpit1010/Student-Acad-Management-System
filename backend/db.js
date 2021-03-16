const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;

module.exports = db;
