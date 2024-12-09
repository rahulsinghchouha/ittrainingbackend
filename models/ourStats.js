const mongoose = require("mongoose");

const ourStatsSchema = new mongoose.Schema({

    mentors:{
        type:Number,
        require:true,
    },
    experience:{
        type:Number,
        require:true,
    },
    placedStudent:{
        type:Number,
        require:true,
    },
    yearsOfJourney:{
        type:Number,
        require:true
    }
})

const ourStats = mongoose.model("ourStatsSchema",ourStatsSchema);

module.exports = ourStats;


















