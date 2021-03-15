const db = require("../db");

db.on("error", function(err) {console.log(err);});



db.once("open", function () {
    console.log("Connected to MongoDB");
});

module.exports={ finder: function find (name, query, cb) {
    db.db.collection(name, function (err, collection) {
       collection.find(query).toArray(cb);
   });
}};

