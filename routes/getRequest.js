const router = require("express").Router();
const getRequest = require("../controllers/getRequest");


router.get("/course-card",getRequest.getCourseCard);
router.get("/student-placed",getRequest.getStudentPlaced);
router.get("/get-partners",getRequest.getPartners);
router.get("/get-explore-card",getRequest.getExploreCard);
router.get("/get-our-stats",getRequest.getOurStats);

module.exports = router;


