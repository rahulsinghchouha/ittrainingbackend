const router = require("express").Router();
const getRequest = require("../controllers/getRequest");


router.get("/get-home",getRequest.getHome);
//course
router.get("/course-card",getRequest.getCourseCard);
router.get("/course-banner-img",getRequest.getCourseBanner);
router.get("/course-details-banner",getRequest.getCourseDetailsBanner);

router.get("/get-about-us",getRequest.getAboutUs);
//Testimonial
router.get("/student-placed",getRequest.getStudentPlaced);
router.get("/testimonial-banner",getRequest.getTestimonialBanner);

router.get("/get-partners",getRequest.getPartners);

router.get("/get-explore-card",getRequest.getExploreCard);
router.get("/get-category-by-name",getRequest.getCategoryByName);

router.get("/get-our-stats",getRequest.getOurStats);
//BLOG
router.get("/get-blogs",getRequest.getBlogs);
router.get("/get-blog-banner",getRequest.getBlogBanner);
router.get("/get-blog-detail-banner",getRequest.getBlogDetailBanner);

//Contact US
router.get("/get-contact-us",getRequest.getContactUs);
//TAG
router.get("/get-tags",getRequest.getTags);
router.get("/get-tag-banner",getRequest.getTagBanner);

module.exports = router;


