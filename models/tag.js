const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag:{
        type:String,
        required:true,
        unique: true
    }
})

const tags = mongoose.model("tagSchema",tagSchema);

module.exports = tags;


