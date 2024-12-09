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

 const card = mongoose.model("courseCard",courseCard);

module.exports = card;


