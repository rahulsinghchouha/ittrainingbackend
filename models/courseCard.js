const mongoose = require("mongoose")

const courseCard = new mongoose.Schema({
    category:{
        type:String,
        require:true,
    },
    img:{
        type:String,
        require:true
    },
    heading:{
        type:String,
        require:true
    },
    para:{
        type:String,
        require:true
    }
})

mongoose.model("courseCard",courseCard);

exports.module = courseCard;


