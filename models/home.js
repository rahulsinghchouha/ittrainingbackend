const mongoose = require("mongoose");


const homeSchema = new mongoose.Schema({

    bannerHeading: { type: String, required: true },

   
    bannerImage: { type: String, required: true },

    bannerBgImg: { type: String, required: true },

    chooseCourseHead: { type: String, required: true },

    upliftYourCareerHead: { type: String, required: true },

   
    howToStart: [
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

    maximizeCareerHead: {
        type: String,
        required: true,
    },
    
    
    maximizeCareerImg: {
        type: String,
        required: true,
    },
    blogImg: {
        type: String, required: true,
    },
    blogHead: {
        type: String, required: true,
    },
    
    jobReadyHead: { type: String, required: true },
   
    interviewPrepHead: { type: String, required: true },
   
    mentorsHead: { type: String, required: true },
   
    careerCounsilHead: { type: String, required: true },
   
    beforeCollegeHead: { type: String, required: true },
  
    beforeCollegeImg: { type: String, required: true },
});

const home = mongoose.model("home", homeSchema);

module.exports = home;

