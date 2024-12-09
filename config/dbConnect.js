const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("DB Connected Succesfully");
    }
    catch (error) {
        console.log("Failed to connect to the database\n ------ERROR------\n", error)
    }
}
module.exports = dbConnect;

