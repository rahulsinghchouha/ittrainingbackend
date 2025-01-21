const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    keyAreas: [
        {
            heading: {
                type: String,
                required: true,
            },
            details: {
                type: String,
                required: true
            }
        }
    ],
    toolsInHand: [
        {
        type: String,
        required: true,
    }],
    benefits: 
        {
            type: String,
            required: true,
        },
    courseCurriculum: [
        {
            heading: {
                type: String,
                required: true,
            },
            details: [
                {
                type: String,
                required: true,
            }
        ],
        }
    ],
    keyHighLights: [{
        type: String,
        required: true,
    }],
    certificate : {
        type:String,
        required :true,
    },
    jobRoles: [{
        type: String,
        required: true
    }],
    fAQ: [
        {
            heading: {
                type: String,
                required: true,
            },
            details: {
                type: String,
                required: true,
            },
        }
    ],
}, { timestamps: true })

const bannerImgSchema = new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    coursePageHeading:{
        type:String,
        require:true
    }
})
const courseDetailsBannerSch = new mongoose.Schema({
    img:{
        type:String,
        required:true
    }
}) 

const course = mongoose.model("course", courseSchema);

const bannerImgCourse = mongoose.model("bannerImgCourse",bannerImgSchema)

const courseDetailsBanner = mongoose.model("courseDetailsBanner",courseDetailsBannerSch);

module.exports = {bannerImgCourse,course,courseDetailsBanner};


