const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require("./Student");

const acadcalSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // name: "Academic Calendar",
    calpdf: {
        type: String
    }
}
// , {
//     collection: 'acad'
// }
)

const certSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    enrollment:{
        type: mongoose.Schema.Types.String, ref: 'Student'
    },
    // certpdf: {
    //     type: String
    // },
    certpdf: {
        type: Array
    }
}
// , {
//     collection: 'acad'
// }
)

const calendar = mongoose.model('AcadCal', acadcalSchema);
const certificate = mongoose.model("Certificate", certSchema);

module.exports = {calendar, certificate};