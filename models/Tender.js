const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TenderSchema = new mongoose.Schema({
    tenderNumber: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    // productNumber: {
    //     type: String,
    //     required: true,
    // },
    description: {
        type: String,
        required: true,
    },
    closingTime: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { usePushEach: true });
module.exports = mongoose.model("Tender", TenderSchema);