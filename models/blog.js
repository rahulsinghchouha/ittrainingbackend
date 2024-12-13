const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    img:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    heading:{
        type:String,
        require:true
    }
})

const blogs = mongoose.model("blogSchema",blogSchema);

module.exports = blogs;

