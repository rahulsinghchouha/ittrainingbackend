const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },

    //for forgot the password
    otp:{
        type:String,
    }

})

const newAdmin = mongoose.model("adminSchema",adminSchema);

module.exports = newAdmin;


