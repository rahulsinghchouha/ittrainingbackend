const express = require('express')
const dbConnect = require('./config/dbConnect')
const studentDetails = require("./api/studentDetail");
const adminRoute = require("./api/adminRoute");
const getRoute = require("./api/getRequest");
const cors = require("cors");
const path = require('path');
const fetch = require('node-fetch');
const flash = require("connect-flash");
const session = require("express-session")
const {isAuthenticated} = require("./middleware/session");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000

//middleware for access the json data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
//app.use(upload.array()); // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public'))); //serve static files images

//express - session
app.use(session({
    secret:process.env.EXPRESS_SESSION,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,
        maxAge:60 * 60 * 1000
    }
}))
// Set up flash middleware
app.use(flash());

//db connect
dbConnect();


//cors

const corsOptions = {
    origin: ["http://localhost:3000","http://localhost:5173","https://ittrainings-csxl.onrender.com"],
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


app.get("/login", (req, res) => {
    res.render("index", { message: "" });
});


// Apply authentication middleware to routes that require authentication
app.use('/admin', isAuthenticated);

app.get("/admin/dashboard", async (req, res) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-home`);
    const object = await response.json();
    // console.log(object?.data);
    res.render("dashboard", { success:req.flash('success'),error:req.flash('error') ,homePage: object?.data, backendUrl: process.env.BACKEND_URL });
});



app.get("/admin/home", (req, res) => {
    res.render("home");
});
app.get("/admin/add-home", (req, res) => {
    res.render("newHome",{success:req.flash('success'), error:req.flash('error')});
});
//Course
app.get("/admin/course", async (req, res) => {
   // console.log("Redirecting to /course with flash message",req.flash('success'));
    let object;
    let bannerCourse;
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

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/course-banner-img`);

        if (!response.ok) {
            throw new Error("invalid API Call");
        }
        bannerCourse = await response.json();

        if (!bannerCourse || !bannerCourse.data) {
            throw new Error("courses not found");
        }

    }
    catch (error) {
        console.log("error to get the courses", error);
    }
   // console.log("Redirecting to /course with flash messageee",req.flash('success'));
    res.render("courses", {success:req.flash('success'),error:req.flash('error') , courses: object?.data,bannerCourse: bannerCourse?.data , backendUrl: process.env.BACKEND_URL });
});

app.get("/admin/update-course/:id", async (req, res) => {
    const courseId = req.params.id;
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
    res.render("updateCourse", {success:req.flash('success'),error:req.flash('error') ,courseDetails: object?.data, backendUrl: process.env.BACKEND_URL });
})



app.get("/admin/add-course", (req, res) => {
    res.render("addCourse",{success:req.flash('success'),error:req.flash('error') });
});
//==========TESTIMONIAL PAGE============
app.get("/admin/our-testimonial", async (req, res) => {
    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/student-placed`);
        if (!response.ok) {
            throw new Error("Resoponse not getting");
        }
        object = await response.json();

        if (!object || !object.data) {
            throw new Error("object data not getting");
        }

    }
    catch (error) {
        console.log("error to get the testimonial", error);
    }
    res.render("testimonial", { success:req.flash('success'),error:req.flash('error') , testimonials: object.data, backendUrl: process.env.BACKEND_URL });
});
app.get("/admin/testimonial/update-testimonial/:id", async (req, res) => {

    const testimonialId = req.params.id;

    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/get-testimonial-by-id`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ testimonialId })
        });
        if (!response.ok) {
            throw new Error("error to get the response");
        }
        object = await response.json();
        if (!object || !object.data) {
            throw new Error("Error to find the object");
        }
    }
    catch (error) {
        console.log("Error to get the testimonial details", error);
    }
    res.render("updateTestimonial", {success:req.flash('success'),error:req.flash('error'), testimonialDetails: object?.data, backendUrl: process.env.BACKEND_URL });
})


app.get("/admin/new-testimonial", (req, res) => {
    res.render("newTestimonial", {success:req.flash('success'),error:req.flash('error') });
});


//=======================Blog Section===============
app.get("/admin/blogs", async (req, res) => {
    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-blogs`);
        if (!response.ok) {
            throw new Error("response not get");
        }
        object = await response.json();
        if (!object || !object.data) {
            throw new Error("data not found");
        }
    }
    catch (error) {
        console.log("error to fetch the data ", error);
    }
    res.render("blog", { success:req.flash('success'), error:req.flash('error'), blogs: object.data, backendUrl: process.env.BACKEND_URL });
});

app.get("/admin/update-blog/:id", async (req, res) => {
    const blogId = req.params?.id;
    let tags;
    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/get-blog-by-id`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ blogId })
        })
        if (!response.ok) {
            throw new Error("response not get");
        }
        object = await response.json();
        if (!object || !object.data) {
            throw new Error("blog not found");
        }
    }
    catch (error) {
        console.log("error to get the blogs", error);
    }
    //for get the tags
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-tags`);
        if (!response.ok) {
            throw new Error("response not get");
        }
        tags = await response.json();
        if (!tags || !tags.data) {
            throw new Error("tag not found");
        }
    }
    catch (error) {
        console.log("error", error);
    }

    res.render("updateBlog", { success:req.flash('success'), error:req.flash('error'), blogDetails: object.data, tags:tags.data, backendUrl: process.env.BACKEND_URL });

})

app.get("/admin/add-newBlog", (req, res) => {
    res.render("addNewBlog",{success:req.flash('success'), error:req.flash('error')});
});

app.get("/admin/add-newTag", async (req, res) => {

    let tags;

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-tags`);
        if (!response.ok) {
            throw new Error("response not get");
        }
        tags = await response.json();
        if (!tags || !tags.data) {
            throw new Error("tag not found");
        }
    }
    catch (error) {
        console.log("error", error);
    }

    res.render("addNewTag",{ success:req.flash('success'),error:req.flash('error'), tags:tags.data});
});

app.get("/admin/contact-us", async (req, res) => {
    let object;
    try {
        const response = await fetch(`${process.env?.BACKEND_URL}/api/v1/get/get-contact-us`);
        if (!response.ok) {
            throw new Error("not fetching the contact us details");
        }
        object = await response.json();

        if (!object || !object.data) {
            throw new Error("contact us data not found");
        }
    }
    catch (error) {
        console.log("error to get the contact us", error);
    }
    res.render("contactUs", {success:req.flash('success'),error:req.flash('error'), contactData: object?.data, backendUrl: process.env?.BACKEND_URL });
});
app.get("/admin/add-contactUs", (req, res) => {
    res.render("addContactUs",{success:req.flash('success'),error:req.flash('error')});
});

app.get("/admin/about-us", async (req, res) => {
    let object;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-about-us`);
        if (!response.ok) {
            throw new Error("not getting any response");
        }
        object = await response.json();
        if (!object || !object.data) {
            throw new Error("data not get");
        }

    }
    catch (error) {
        console.log("error to get data", error);
    }

    res.render("aboutUs", { success:req.flash('success'),error:req.flash('error') , aboutUs: object.data, backendUrl: process.env.BACKEND_URL });
});

app.get("/admin/add-aboutUs", (req, res) => {
    res.render("addAboutUs",{ success:req.flash('success'),error:req.flash('error') });
});

app.get("/admin/add-partners", async (req, res) => {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-partners`);

    const object = await response.json();

    // console.log("partners",object.data); 
    res.render("addPartners", {  success:req.flash('success'),error:req.flash('error') ,partners: object?.data, backendUrl: process.env.BACKEND_URL });
});

app.get("/admin/add-categories", async (req, res) => {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/get/get-explore-card`)

    const object = await response.json();

    //    console.log("categories",object?.data);

    res.render("addCategories", { success:req.flash('success'), error:req.flash('error'), categories: object?.data, backendUrl: process.env.BACKEND_URL });
});

app.get("/admin/update-category/:id", async (req, res) => {
    const categoryId = req.params.id;

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
        res.render("updateCategory", {success:req.flash('success'), error:req.flash('error'), category: object?.data, backendUrl: process.env.BACKEND_URL });
    }
    catch (error) {
        console.log("error to fetch the particular category details", error);
        res.render("addCategories");
    }


})


app.get("/admin/add-ourStats", async (req, res) => {

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

    res.render("addOurStats", { success:req.flash('success'), error:req.flash('error'), ourStats: object?.data });

});

app.listen(PORT, () => {
    console.log("Hi i am listening on PORT", PORT);
})
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Vercel Backend!' });
});


