const mongoose = require("mongoose");

const studentDetailsSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
phone:{
    type:Number,
    required:true,
},
course:{
    type:String,
    required:true,
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

