const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    img:{
        type:String,
        require:true
    },

    heading:{
        type:String,
        require:true
    },
    details:{
        type:String,
        require:true,
    },
    
},
{ timestamps: true })

const blogs = mongoose.model("blogSchema",blogSchema);

module.exports = blogs;

