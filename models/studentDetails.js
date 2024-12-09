const mongoose = require("mongoose");

const studentDetailsSchema = new mongoose.Schema({

name:{
    type:String,
    require:true,
},
email:{
    type:String,
    require:true,
},
phone:{
    type:Number,
    require:true,
},
course:{
    type:String,
    require:true,
},
joiningTime:{
    type:String,
},
message:{
    type:String
}
})

const studentDetails = mongoose.model("studentDetails",studentDetailsSchema);

module.exports = studentDetails;

