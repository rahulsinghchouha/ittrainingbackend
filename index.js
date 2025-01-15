const express = require('express')
const dbConnect = require('./config/dbConnect')
const studentDetails = require("./routes/studentDetail");
const adminRoute = require("./routes/adminRoute");
const getRoute = require("./routes/getRequest");
const cors = require("cors");
const path = require('path');
const fetch = require('node-fetch');


const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000

//middleware for access the json data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
//app.use(upload.array()); // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public'))); //serve static files images

//db connect
dbConnect();


//cors

const corsOptions = {
    origin: "http://localhost:3000",
    methods: 'GET,POST,DELETE,PUT',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}
app.use(cors(corsOptions));

//routers
app.use("/api/v1/student-details", studentDetails);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/get", getRoute);


//EJS Setup

app.set('view engine', 'ejs'); // Tells Express to use EJS for rendering views.

//Route for show the view




app.get("/login", (req, res) => {
    res.render("index", { message: "" });
});

app.get("/home", (req, res) => {
    res.render("home");
});
app.get("/add-home", (req, res) => {
    res.render("newHome");
});
//Course
app.get("/course", async (req, res) => {

    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/course-card`);

        if (!response.ok) {
            throw new Error("invalid API Call");
        }
        object = await response.json();

        if (!object || !object.data) {
            throw new Error("courses not found");
        }

    }
    catch (error) {
        console.log("error to get the courses", error);
    }
    res.render("courses", { courses: object.data, backendUrl: process.env.BACKEND_URL });
});
app.get("/update-course/:id", async (req, res) => {

    const courseId = req.params.id;
    if (!courseId) {
        res.render("courses");
    }
    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/get-course-by-id`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ courseId })
        })
        if (!response.ok) {
            throw new Error("not a valid course category API Call");
        }
        object = await response.json();

        if (!object || !object.data) {
            throw new Error("course Details not found");
        }
    }
    catch (error) {
        console.log("error to get the course", error);
    }

    res.render("updateCourse",{courseDetails:object?.data,backendUrl:process.env.BACKEND_URL});
})



app.get("/add-course", (req, res) => {
    res.render("addCourse");
});

app.get("/our-testimonial", (req, res) => {
    res.render("testimonial");
});
app.get("/new-testimonial", (req, res) => {
    res.render("newTestimonial");
});

app.get("/dashboard", async (req, res) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-home`);
    const object = await response.json();
    // console.log(object?.data);
    res.render("dashboard", { homePage: object?.data, backendUrl: process.env.BACKEND_URL });
});

app.get("/blogs", (req, res) => {
    res.render("blog");
});

app.get("/add-newBlog", (req, res) => {
    res.render("addNewBlog");
});

app.get("/add-newTag", (req, res) => {
    res.render("addNewTag");
});

app.get("/contact-us", (req, res) => {
    res.render("contactUs");
});
app.get("/add-contactUs", (req, res) => {
    res.render("addContactUs");
});

app.get("/about-us", (req, res) => {
    res.render("aboutUs");
});

app.get("/add-aboutUs", (req, res) => {
    res.render("addAboutUs");
});

app.get("/add-partners", async (req, res) => {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-partners`);

    const object = await response.json();

    // console.log("partners",object.data); 
    res.render("addPartners", { partners: object?.data, backendUrl: process.env.BACKEND_URL });
});

app.get("/add-categories", async (req, res) => {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-explore-card`)

    const object = await response.json();

    //    console.log("categories",object?.data);

    res.render("addCategories", { categories: object?.data, backendUrl: process.env.BACKEND_URL });
});

app.get("/update-category/:id", async (req, res) => {
    const categoryId = req.params.id;
    // console.log(categoryId);
    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/get-category-by-id`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ categoryId })
        })
        if (!response.ok) {
            throw new Error(`Failed to fetch category details, status: ${response.status}`);
        }
        object = await response.json();
        // Check if the response contains the expected data
        if (!object || !object.data) {
            throw new Error("Category data not found in the response");
        }
    }
    catch (error) {
        console.log("error to fetch the particular category details", error);
    }

    res.render("updateCategory", { category: object?.data, backendUrl: process.env.BACKEND_URL });
})


app.get("/add-ourStats", async (req, res) => {

    let object;

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-our-stats`);
        if (!response.ok) {
            throw new Error(`Failed to fetch category details, status: ${response.status}`);
        }
        object = await response.json();
        if (!object || !object.data) {
            throw new Error("Category data not found in the response");
        }
    }
    catch (error) {
        console.log("error to fetch our stats", error);
    }

    res.render("addOurStats", { ourStats: object?.data });

});

app.listen(PORT, () => {
    console.log("Hi i am listening on PORT", PORT);
})



