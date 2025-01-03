const router = require("express").Router();
const getRequest = require("../controllers/getRequest");


router.get("/get-home",getRequest.getHome);
router.get("/course-card",getRequest.getCourseCard);
router.get("/student-placed",getRequest.getStudentPlaced);
router.get("/get-partners",getRequest.getPartners);
router.get("/get-explore-card",getRequest.getExploreCard);
router.get("/get-our-stats",getRequest.getOurStats);
router.get("/get-blogs",getRequest.getBlogs);

module.exports = router;


