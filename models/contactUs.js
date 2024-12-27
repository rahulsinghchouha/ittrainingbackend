const mongoose = require("mongoose");


const contactUsSchema = new mongoose.Schema({

    bannerImg: {
        type: String,
        require: true,
    },
    contactUsHead: {
        type: String,
        require: true,
    },
    contactUsSubHead: {
        type: String,
        require: true,
    },
    contactUsDetails: {
        type: String,
        require: true,
    },
    officeAddress: {
        type: String,
        require: true,
    },
    contactDetails: {
        type: String,
        require: true,
    },
    officeTiming: {
        type: String,
        require: true,
    },
})

const contactUs = mongoose.model("contactUs", contactUsSchema);

module.exports = contactUs;
