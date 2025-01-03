const mongoose = require("mongoose");


const homeSchema = new mongoose.Schema({

    bannerHeading: { type: String, require: true },

   
    bannerImage: { type: String, require: true },

    bannerBgImg: { type: String, require: true },

    chooseCourseHead: { type: String, require: true },

    upliftYourCareerHead: { type: String, require: true },

   
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

    maximizeCareerHead: {
        type: String,
        require: true,
    },
    
    
    maximizeCareerImg: {
        type: String,
        require: true,
    },
    blogImg: {
        type: String, require: true,
    },
    blogHead: {
        type: String, require: true,
    },
    
    jobReadyHead: { type: String, require: true },
   
    interviewPrepHead: { type: String, require: true },
   
    mentorsHead: { type: String, require: true },
   
    careerCounsilHead: { type: String, require: true },
   
    beforeCollegeHead: { type: String, require: true },
  
    beforeCollegeImg: { type: String, require: true },
});

const home = mongoose.model("home", homeSchema);

module.exports = home;

