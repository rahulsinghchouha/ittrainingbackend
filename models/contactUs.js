const mongoose = require("mongoose");


const contactUsSchema = new mongoose.Schema({

    bannerImg: {
        type: String,
        required: true,
    },
    contactUsHead: {
        type: String,
        required: true,
    },
    contactUsSubHead: {
        type: String,
        required: true,
    },
    contactUsDetails: {
        type: String,
        required: true,
    },
    officeAddress: {
        type: String,
        required: true,
    },
    contactDetails: {
        type: String,
        required: true,
    },
    officeTiming: {
        type: String,
        required: true,
    },
})

const contactUs = mongoose.model("contactUs", contactUsSchema);

module.exports = contactUs;