const mongoose = require("mongoose");


const tagSchema = new mongoose.Schema({
    tagName:{
        type:String,
        require:true,
    },
    tagImage:{
        type:String,
        require:true,
    },
    tagHeading:{
        type:String,
        require:true,
    },
    tagDetails:{
        type:String,
        require:true,
    }
})

const tag = mongoose.model("tag",tagSchema);

module.exports = tag;


