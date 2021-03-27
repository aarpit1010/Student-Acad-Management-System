const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    // name: "Academic Calendar",
    certpdf: {
        type: String
    }
}
// , {
//     collection: 'acad'
// }
)

const calendar = mongoose.model('AcadCal', acadcalSchema);
const certificate = mongoose.model("Certificate", certSchema);

module.exports = {calendar, certificate};