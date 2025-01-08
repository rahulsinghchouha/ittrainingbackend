const mongoose = require("mongoose");



const blogSchema = new mongoose.Schema({
    img: {
        type: String,
        require: true
    },
    heading: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true,
    },
    tags: [
        {
            type: String,
            require: true,
        }
    ]
},
    { timestamps: true })

const bannerImgSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    }
})

const blogs = mongoose.model("blogSchema", blogSchema);
const bannerImgBlog = mongoose.model("bannerImgBlog", bannerImgSchema);

module.exports = { bannerImgBlog, blogs }
