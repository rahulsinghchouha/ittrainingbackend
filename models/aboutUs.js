const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({

    bannerImage: {
        type: String,
        required: true,
    },
    yourImaginationImg: {
        type: String,
        required: true
    },
    yourImaginationHead: {
        type: String,
        required: true
    },
    totalStudentJoined:{
        type:Number,
        required:true,
    },
    ourJourneyHead: {
        type: String,
        required: true,
    },
    ourJourneyImg: {
        type: String,
        required: true,
    },
    ourBeliefsHead: {
        type: String,
        required: true,
    },
   
    ourBeliefImg: {
        type: String,
        required: true,
    },
    ourMissionHead: {
        type: String,
        required: true,
    },
    ourMissionImg: {
        type: String,
        required: true,
    },
    missionDetails: {
        type: String,
        required: true,
    },
    visionDetails: {
        type: String,
        required: true,
    },
    valuesDetails: {
        type: String,
        required: true,
    },
})


const aboutUs = mongoose.model("aboutUs", aboutUsSchema);



module.exports = aboutUs;
