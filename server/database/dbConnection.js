const mongoose = require("mongoose");
require('dotenv').config();

exports.dbConnection = function() {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Login"
    }).then(() => {
        console.log("Connected to database Successfully!");
    }).catch((err) => {
        console.log(`Some error occurred while connecting to database! ${err}`);
    });
};
