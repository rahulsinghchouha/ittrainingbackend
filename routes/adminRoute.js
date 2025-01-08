const router = require('express').Router();
const admin = require("../controllers/adminController");
const upload = require("../config/storeFile");


router.post("/add-admin",admin.addAdmin);
router.post("/admin-login",admin.adminLogin);
router.post("/add-course",upload.single("img"),admin.addCourse);
router.post("/student-placed", upload.single("img"), admin.addStudentPlaced);
router.post("/add-partners", upload.single("img"), admin.addOurPartners);
router.post("/our-stats", admin.addOurStats);


router.post( "/explore-category",upload.any(), admin.addExploreCategory);
  

//add Home 
router.post("/add-home",upload.fields([
{name:"bannerImage", maxCount:1},
{name:"bannerBgImg", maxCount:1},
{name:"maximizeCareerImg", maxCount:1},
{name:"blogImg", maxCount:1},
{name:"beforeCollegeImg", maxCount:1}

]), admin.addHome);

// ADD ABOUT US
router.post("/add-about-us",upload.fields([
    {name:"bannerImage",maxCount:1},
    {name:"yourImaginationImg",maxCount:1},
    {name:"ourJourneyImg",maxCount:1},
    {name:"ourBeliefImg",maxCount:1},
    {name:"ourMissionImg",maxCount:1},]), admin.addAboutUS);

//add blog
router.post("/add-blogs",upload.single("img"),admin.addBlog);
router.post("/add-tag",admin.addTag);

//contact us
router.post("/add-contact-us",upload.single("bannerImg"),admin.addContactUs);



module.exports = router;


