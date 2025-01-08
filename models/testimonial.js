const mongoose = require('mongoose');

const studentPlaced = new mongoose.Schema({
    name :{
        type:String,
        require:true
    },
    profile:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    }
})

const bannerImgSchema = new mongoose.Schema({
    img:{
        type:String,
        require:true,
    }
})


const student = mongoose.model("studentPlaced",studentPlaced);

const bannerImg = mongoose.model("bannerImgTestimonial",bannerImgSchema);

module.exports = {student,bannerImg};


