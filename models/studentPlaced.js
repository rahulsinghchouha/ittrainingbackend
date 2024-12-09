const mongoose = require('mongoose');

const studentPlaced = new mongoose.Schema({
    name :{
        type:String,
        require:true
    },
    profile:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    }
})
const student = mongoose.model("studentPlaced",studentPlaced);

module.exports = student;