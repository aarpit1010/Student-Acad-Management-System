const Log = require("../model/log");

function currDateTime(currentTime) {
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;
    var ISTTime = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );
    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var secondsIST = ISTTime.getSeconds();
    var time = hoursIST + ":" + minutesIST + ":" + secondsIST;
    var mnth = currentTime.getMonth() + 1;
    var date_time =
        currentTime.getDate() +
        "-" +
        mnth +
        "-" +
        currentTime.getFullYear() +
        " " +
        time;
    return date_time;
}

function addtoLog(action_string, role, currentTime) {
    var current_date_time = currDateTime(currentTime);
    const log = new Log({
        createdAt: current_date_time,
        action: action_string,
        role: role,
    });
    log.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            // console.log("Updated Logs");
        }
    });
}

module.exports = { currDateTime, addtoLog };