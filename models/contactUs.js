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
    contactUsNumber: {
        type: Number,
        require: true,
    },
    contactUsEmail:{
        type:String,
        require:true,
    },
    officeAddress: {
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
