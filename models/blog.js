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
    blogCategory: {
        type:String,
        required:true
    },
    details: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
            required: true,
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

const blogDetailBannerSch = new mongoose.Schema({
    img:{
        type:String,
        required:true,
    }
})

const blogs = mongoose.model("blogSchema", blogSchema);
const bannerImgBlog = mongoose.model("bannerImgBlog", bannerImgSchema);
const blogDetailBanner = mongoose.model("blogDetailBanner",blogDetailBannerSch);

module.exports = { bannerImgBlog, blogs, blogDetailBanner };
