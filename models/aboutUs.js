const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({

    bannerImage:{
        type:String,
        require:true,
    },
    yourImaginationHead:{
        type:String,
        require:true
    },
    yourImaginationPara:{
        type:String,
        require:true,
    },
    yourImaginationDetails:{
        type:String,
        require:true,
    },
    ourJourneyHead:{
        type:String,
        require:true,
    },
    ourJourneyPara:{
        type:String,
        require:true,
    },
    ourJourneyImg:{
        type:String,
        require:true,   
    },
    ourBeliefsHead:{
        type:String,
        require:true,
    },
    ourBeliefPara:{
        type:String,
        require:true,
    },
    ourBeliefImg:{
        type:String,
        require:true,
    },
    ourMissionHead:{
        type:String,
        equire:true,
    },
    ourMissionPara:{
        type:String,
        require:true,
    },
    ourMissionImg:{
        type:String,
        require:true,
    },
})


const aboutUs = mongoose.model("aboutUs",aboutUsSchema);



module.exports = aboutUs;
