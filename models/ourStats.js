const mongoose = require("mongoose");

const ourStatsSchema = new mongoose.Schema({

    mentors:{
        type:Number,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    placedStudent:{
        type:Number,
        required:true,
    },
    yearsOfJourney:{
        type:Number,
        required:true
    }
})

const ourStats = mongoose.model("ourStatsSchema",ourStatsSchema);

module.exports = ourStats;


















