const router = require('express').Router();
const admin = require("../controllers/adminController");
const {upload} = require("../config/storeFile");


router.post("/add-admin",admin.addAdmin);
router.post("/admin-login",admin.adminLogin);

//COURSE
router.post("/add-course",upload.single("img"),admin.addCourse);
router.post("/get-course-by-id",admin.getCourseById);
router.post("/update-course",upload.single("img"),admin.updateCourse);
router.post("/delete-course",admin.deleteCourse);

router.post("/add-course-banner",upload.single("img"),admin.addCourseBannerImage);
router.post("/student-placed", upload.single("img"), admin.addStudentPlaced);
//partners
router.post("/add-partners", upload.single("img"), admin.addOurPartners);
router.post("/update-partners",upload.single("img"),admin.updateOurPartners);
router.post("/delete-partners",admin.deleteOurPartner);

//our stats
router.post("/our-stats", admin.addOurStats);

//category
router.post("/explore-category",upload.any(), admin.addExploreCategory);
router.post("/delete-category",admin.deleteCategory);
router.post("/get-category-by-id",admin.getCategoryById);
router.post("/update-category",upload.any(),admin.updateCategory);
//add Home 
router.post("/add-home",upload.fields([
{name:"bannerImage", maxCount:1},
{name:"bannerBgImg", maxCount:1},
{name:"maximizeCareerImg", maxCount:1},
{name:"blogImg", maxCount:1},
{name:"beforeCollegeImg", maxCount:1}
]), admin.addHome);

//Update Home
router.post("/update-home",upload.fields([
    {name:"bannerImage", maxCount:1},
    {name:"bannerBgImg", maxCount:1},
    {name:"maximizeCareerImg", maxCount:1},
    {name:"blogImg", maxCount:1},
    {name:"beforeCollegeImg", maxCount:1}
    ]), admin.updateHome);

// ABOUT US
router.post("/add-about-us",upload.fields([
    {name:"bannerImage",maxCount:1},
    {name:"yourImaginationImg",maxCount:1},
    {name:"ourJourneyImg",maxCount:1},
    {name:"ourBeliefImg",maxCount:1},
    {name:"ourMissionImg",maxCount:1},]), admin.addAboutUS);

router.post("/update-about-us",upload.fields([
    {name:"bannerImage",maxCount:1},
    {name:"yourImaginationImg",maxCount:1},
    {name:"ourJourneyImg",maxCount:1},
    {name:"ourBeliefImg",maxCount:1},
    {name:"ourMissionImg",maxCount:1}]),admin.updateAboutUs);

//BLOG
router.post("/add-blogs",upload.single("img"),admin.addBlog);
router.post("/add-tag",admin.addTag);
router.post("/get-blog-by-id",admin.getBlogById);

//contact us
router.post("/add-contact-us",upload.single("bannerImg"),admin.addContactUs);



module.exports = router;


