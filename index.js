const express = require('express')
const dbConnect = require('./config/dbConnect')
const studentDetails = require("./routes/studentDetail");
const adminRoute = require("./routes/adminRoute");
const cors = require("cors");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4500

//middleware for access the json data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data


//db connect
dbConnect();

//cors

const corsOptions = {
    origin:"http://localhost:3000",
    methods:'GET,POST,DELETE,PUT,',
    allowedHeaders:'Content-Type,Authorization',
    credentials: true
}
app.use(cors(corsOptions));

//routers
app.use("/api/v1/student-details",studentDetails);
app.use("/api/v1/admin",adminRoute);

app.listen(PORT,()=>{
    console.log("Hi i am listening on PORT",PORT);   
})

