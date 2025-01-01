const mongoose = require("mongoose");


const homeSchema = new mongoose.Schema({

    bannerHeading: { type: String, require: true },

    bannerPara: { type: String, require: true },

    bannerImage: { type: String, require: true },

    bannerBgImg: { type: String, require: true },

    chooseCourseHead: { type: String, require: true },

    chooseCoursePara: { type: String, require: true },

    courseCard: [{
        type: mongoose.Schema.ObjectId,
        ref: "course",
        require: true,
    }],

    upliftYourCareerHead: { type: String, require: true },

    upliftYourCareerPara: { type: String, require: true },

    howToStart: [
        {
            heading: {
                type: String,
                require: true,
            },
            details: {
                type: String,
                require: true
            }
        }
    ],
    studentPlaced: [{
        type: mongoose.Schema.ObjectId,
        ref: "studentPlaced",
        require: true,
    }],

    ourPartners: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "ourPartners",
            require: true,
        }],

    exploreCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: "exploreCategory",
        require: true,
    }],

    maximizeCareerHead: {
        type: String,
        require: true,
    },
    maximizeCareerPara: {
        type: String,
        require: true,
    },
    classRoomTraining: {
        type: String,
        require: true,
    },
    industrialTraining: {
        type: String,
        require: true,
    },
    corporateTraining: {
        type: String,
        require: true,
    },
    maximizeCareerImg: {
        type: String,
        require: true,
    },
    ourStats: {
        type: mongoose.Schema.ObjectId,
        require: true,
    },
    blogImg: {
        type: String, require: true,
    },
    blogHead: {
        type: String, require: true,
    },
    blogPara: {
        type: String, require: true,
    },
    jobReadyHead: { type: String, require: true },
    jobReadyPara: { type: String, require: true },
    interviewPrepHead: { type: String, require: true },
    interviewPrepPara: { type: String, require: true },
    mentorsHead: { type: String, require: true },
    mentorsPara: { type: String, require: true },
    careerCounsilHead: { type: String, require: true },
    careerCounsilPara: { type: String, require: true },
    beforeCollegeHead: { type: String, require: true },
    beforeCollegePara: { type: String, require: true },
    beforeCollegeImg: { type: String, require: true },
});

const home = mongoose.model("home", homeSchema);

module.exports = home;

