const mongoose = require('mongoose');

const studentPlaced = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    }
})

const bannerImgSchema = new mongoose.Schema({
    img:{
        type:String,
        required:true,
    }
})


const student = mongoose.model("studentPlaced",studentPlaced);

const bannerImgTestimonial = mongoose.model("bannerImgTestimonial",bannerImgSchema);

module.exports = {student,bannerImgTestimonial};


