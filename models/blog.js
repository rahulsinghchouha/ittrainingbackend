const mongoose = require("mongoose");



const blogSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true,
    },
},
    { timestamps: true })

const bannerImgSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    }
})

const blogs = mongoose.model("blogSchema", blogSchema);
const bannerImg = mongoose.model("bannerImgBlog", bannerImgSchema);




module.exports = { bannerImg ,blogs}
