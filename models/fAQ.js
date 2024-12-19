const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    question:{
        type:String,
        require:true,
    },
    answer:{
        type:String,
        require:true
    }
})

const fAQ = mongoose.model("FAQ",faqSchema);

module.exports = fAQ;

