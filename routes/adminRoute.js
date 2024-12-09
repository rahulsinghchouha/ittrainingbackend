const router = require('express').Router();
const admin = require("../controllers/adminController");


router.post("/addCourseCard",admin.addCourseCard);



module.exports = router;