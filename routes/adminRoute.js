const router = require('express').Router();
const admin = require("../controllers/adminController");
const upload = require("../config/storeFile");


router.post("/add-course-card", upload.single("img"), admin.addCourse);
router.post("/student-placed", upload.single("img"), admin.studentPlaced);
router.post("/add-partners", upload.single("img"), admin.ourPartners);
router.post("/our-stats", admin.ourStats);
router.post("/explore-category", upload.fields([
    { name: "bgImage", maxCount: 1 }, // bgImage field
    { name: "img", maxCount: 1 }      // img field
]), admin.exploreCategory);

router.post("/add-blogs",upload.single("img"),admin.addBlog);

module.exports = router;


