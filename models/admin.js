const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

    //for forgot the password
    otp:{
        type:String,
    }

})

const addAdmin = mongoose.model("adminSchema",adminSchema);

module.exports = addAdmin;


