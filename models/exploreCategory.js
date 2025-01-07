const mongoose = require("mongoose");

const exploreCatSchema = new mongoose.Schema({
    bgImage: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    heading: {
        type: String,
        require: true,
    },
    para: {
        type: String,
        require: true
    },
    // Extra needed for the category details page
    bannerImg: {
        type: String,
        require: true
    },
    categoryDetailsWhy: {
        type: String,
        require: true
    },
    importance: {
        type: String,
        require: true,
    },
    detailsCard: [
        {
            bgColor: {
                type: String,
                require: true,
            },
            img: {
                type: String,
                require: true,
            },
            cardHeadandDetail: {
                type: String,
                require: true,
            },
        }
    ],
    impPara: {
        type: String,
        require: true,
    },
    processGrowthandSkill: {
        type: String,
        require: true
    }
}, { timestamps: true })
const exploreCategory = mongoose.model("exploreCategory", exploreCatSchema);

module.exports = exploreCategory;

