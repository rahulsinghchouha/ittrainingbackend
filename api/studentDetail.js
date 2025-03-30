const router = require('express').Router();


const studentDetails = require("../controllers/studentDetils");

router.post("/student-form",studentDetails.studentForm);


module.exports = router;

