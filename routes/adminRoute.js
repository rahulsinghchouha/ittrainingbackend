const router = require('express').Router();
const admin = require("../controllers/adminController");
const upload = require("../config/storeFile");


router.post("/addCourseCard",upload.single("img"),admin.addCourseCard);


module.exports = router;