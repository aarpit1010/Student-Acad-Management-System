const mongoose = require("mongoose");

const viewFacultyList = new mongoose.Schema ({
    branch: {type: mongoose.Schema.Types.String, ref: 'Student'},
    semester: {type: mongoose.Schema.Types.String, ref: 'Student'},
    section: {type: mongoose.Schema.Types.String, ref: 'Student'},
    faculty: [
        {
            courseid: String,
            coursename: String,
            facultyname: String
        },
        {
            courseid: String,
            coursename: String,
            facultyname: String
        },
        {
            courseid: String,
            coursename: String,
            facultyname: String
        },
        {
            courseid: String,
            coursename: String,
            facultyname: String
        },
        {
            courseid: String,
            coursename: String,
            facultyname: String
        },
        {
            courseid: String,
            coursename: String,
            facultyname: String
        }
    ]
});

module.exports = mongoose.model("Faculty List", viewFacultyList);