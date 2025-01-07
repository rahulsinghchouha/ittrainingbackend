const router = require('express').Router();
const admin = require("../controllers/adminController");
const upload = require("../config/storeFile");


router.post("/add-admin",admin.addAdmin);
router.post("/admin-login",admin.adminLogin);
router.post("/add-course",upload.single("img"),admin.addCourse);
router.post("/student-placed", upload.single("img"), admin.addStudentPlaced);
router.post("/add-partners", upload.single("img"), admin.addOurPartners);
router.post("/our-stats", admin.addOurStats);


// router.post("/explore-category", upload.fields([
//     { name: "bgImage", maxCount: 1 }, // bgImage field
//     { name: "img", maxCount: 1 },
//     { name: "bannerImg", maxCount: 1 }, 
//     { name: "detailsCard[0][img]",maxCount:1},
//     { name: "detailsCard[1][img]",maxCount:1},
//     { name: "detailsCard[2][img]",maxCount:1},
//     { name: "detailsCard[3][img]",maxCount:1}, 
//     { name: "detailsCard[4][img]",maxCount:1}, 
//     { name: "detailsCard[5][img]",maxCount:1}, 
//     { name: "detailsCard[6][img]",maxCount:1}, 
//     { name: "detailsCard[7][img]",maxCount:1}, 
//     { name: "detailsCard[8][img]",maxCount:1}, 
//     { name: "detailsCard[9][img]",maxCount:1} 
// ]), admin.addExploreCategory);

router.post( "/explore-category",upload.any(), // Accept any files
    admin.addExploreCategory
  );
  

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

//contact us
router.post("/add-contact-us",upload.single("bannerImg"),admin.addContactUs);



module.exports = router;


