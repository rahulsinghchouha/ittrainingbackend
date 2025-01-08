const mongoose = require("mongoose");

const exploreCatSchema = new mongoose.Schema({
    bgImage: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true,
    },
    para: {
        type: String,
        required: true
    },
    // Extra needed for the category details page
    bannerImg: {
        type: String,
        required: true
    },
  
    categoryDetailsWhy: {
        type: String,
        required: true
    },
    categoryDetailsImg: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        required: true,
    },
    detailsCard: [
        {
            bgColor: {
                type: String,
                required: true,
            },
            img: {
                type: String,
                required: true,
            },
            cardHeadandDetail: {
                type: String,
                required: true,
            },
        }
    ],
    impPara: {
        type: String,
        required: true,
    },
    processGrowthandSkill: {
        type: String,
        required: true
    }
}, { timestamps: true })
const exploreCategory = mongoose.model("exploreCategory", exploreCatSchema);

module.exports = exploreCategory;

