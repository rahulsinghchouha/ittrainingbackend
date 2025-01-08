const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag:{
        type:String,
        required:true,
        unique: true
    }
})
const bannerImgSchema = new mongoose.Schema({
    img:{
        type:String,
        required:true,
    }
})

const tags = mongoose.model("tagSchema",tagSchema);




const bannerImgTag = mongoose.model("bannerImgTag",bannerImgSchema)


module.exports = { bannerImgTag,tags}


