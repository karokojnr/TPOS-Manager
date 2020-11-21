const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isManager: {
        type: String,
        default: "YES",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Manager", ManagerSchema);