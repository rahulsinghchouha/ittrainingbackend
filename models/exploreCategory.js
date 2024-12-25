const mongoose = require("mongoose");

const exploreCatSchema = new mongoose.Schema({
    bgImage: {
        type: String,
        require: true
    },
    img:{
        type:String,
        require:true
    },
    heading:{
        type:String,
        require:true,
    },
    para:{
        type:String,
        require:true
    }
})
const exploreCategory = mongoose.model("exploreCategory",exploreCatSchema);

module.exports = exploreCategory;

