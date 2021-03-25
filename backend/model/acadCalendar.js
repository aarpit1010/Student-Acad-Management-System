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

module.exports = mongoose.model('AcadCal', acadcalSchema);