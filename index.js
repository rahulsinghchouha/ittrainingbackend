const express = require('express')
const dbConnect = require('./config/dbConnect')
const studentDetails = require("./routes/studentDetail");
const adminRoute = require("./routes/adminRoute");
const getRoute = require("./routes/getRequest");
const cors = require("cors");
const path = require('path');


const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000

//middleware for access the json data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use(express.static(path.join(__dirname,'public'))); //serve static files images

//db connect
dbConnect();


//cors

const corsOptions = {
    origin:"http://localhost:3000",
    methods:'GET,POST,DELETE,PUT',
    allowedHeaders:'Content-Type,Authorization',
    credentials: true
}
app.use(cors(corsOptions));

//routers
app.use("/api/v1/student-details",studentDetails);
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1/get",getRoute);


//EJS Setup

app.set('view engine', 'ejs'); // Tells Express to use EJS for rendering views.

//Route for show the view
app.get("/login", (req, res) => {
    res.render("index",{message:""});
});

app.get("/home", (req, res) => {
    res.render("home");
});
app.get("/add-home", (req, res) => {
    res.render("newHome");
});




app.listen(PORT,()=>{
    console.log("Hi i am listening on PORT",PORT);   
})


