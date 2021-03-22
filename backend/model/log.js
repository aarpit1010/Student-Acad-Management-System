const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const logsSchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    action : String,
    role: String
});

logsSchema.plugin(findOrCreate);

module.exports = mongoose.model("Log", logsSchema);