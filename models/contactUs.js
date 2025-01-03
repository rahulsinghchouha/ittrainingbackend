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
    contactUsNumber: {
        type: Number,
        required: true,
    },
    contactUsEmail:{
        type:String,
        require:true,
    },
    officeAddress: {
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
