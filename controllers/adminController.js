const courseCard = require("../models/createCourse");
const studentPlaced = require("../models/studentPlaced");
const ourStats = require("../models/ourStats");
const addExploreCategory = require("../models/exploreCategory");
const ourPartners = require("../models/ourPartners");
const blogs = require("../models/blog");

const { successResponse, errorResponse, validationErrorWithData } = require("../helper/apiResponse");


exports.addCourse = async (req, res) => {
    console.log("HYYYYYYYYYY");
    // Logs the uploaded file
    //console.log("req body",req.body); // Logs additional form fields


    const { category, courseName, overview, keyAreas, toolsInHand, benefits, courseCurriculum, keyHighLights, jobRoles, fAQ, eligibility, courseDuration, feeOptions } = req.body;
    const img = req.file?.filename;

    console.log("category ->", category);
    console.log("courseName ->", courseName);
    console.log("overview ->", overview);
    console.log("keyAreas heading->", keyAreas);

    console.log("toolsInHand ->", toolsInHand);
    console.log("benefits ->", benefits);
    console.log("benefits ->", eligibility);
    console.log("benefits ->", courseDuration);
    console.log("benefits ->", feeOptions);
    console.log("courseCurriculum ->", courseCurriculum);
    console.log("keyHighLights ->", keyHighLights);
    console.log("jobRoles ->", jobRoles);
    console.log("fAQ ->", fAQ);
    console.log("img ->", img);

    if (!img || !eligibility || !courseDuration || !feeOptions || !category || !courseName || !overview || !keyAreas || !toolsInHand || !benefits || !courseCurriculum || !keyHighLights || !jobRoles || !fAQ) {
        return validationErrorWithData(res, "card data validation failed");
    }

    try {
        await courseCard.create({
            category, courseName, overview, keyAreas, toolsInHand, benefits, courseCurriculum, keyHighLights, jobRoles, fAQ, eligibility, courseDuration, feeOptions,
            img
        })

        return successResponse(res, "course card added succesfully");
    }
    catch (error) {
        console.log("error", error);
        return errorResponse(res, "card not added ")
    }
}
exports.studentPlaced = async (req, res) => {

    const { name, profile, experience } = req.body;
    const img = req.file?.filename;
    console.log(name, profile, experience, img);
    //validation
    if (!name || !profile || !experience || !img) {
        return validationErrorWithData(res, "student placed data not found");
    }

    try {
        await studentPlaced.create({
            name,
            experience,
            img,
            profile
        })

        return successResponse(res, "placed student stored succesfully");
    }
    catch (error) {
        console.log("Error", error);

        return errorResponse(res, "student not submited please try again");

    }
}
exports.ourStats = async (req, res) => {
    console.log("our stats", req.body);

    const { mentors, experience, placedStudent, yearsOfJourney } = req.body;

    if (!mentors || !experience || !placedStudent || !yearsOfJourney) {
        return validationErrorWithData(res, "our stats data not found");
    }

    try {
        await ourStats.create({
            mentors,
            experience,
            placedStudent,
            yearsOfJourney
        })

        return successResponse(res, "status added succesfully");
    }
    catch (error) {
        return errorResponse(res, "stats not saved please try again");
    }


}
exports.exploreCategory = async (req, res) => {

    const { heading, para } = req.body;
    const bgImage = req.files.bgImage[0].filename;
    const img = req.files.img[0].filename;

    //validation
    if (!heading || !para || !bgImage || !img) {
        return validationErrorWithData(res, "All the fields required to create a card");
    }

    try {
        await addExploreCategory.create({
            heading,
            para,
            img,
            bgImage
        });

        return successResponse(res, "explore Category Card added succesfully");

    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "card not added please verify the data and try again");
    }

}
exports.ourPartners = async (req, res) => {

    const img = req.file.filename;

    if (!img) return validationErrorWithData(res, "img not found");

    try {
        await ourPartners.create({ img });
        return successResponse(res, "partner added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "partner not added please try again");
    }

}
exports.addBlog = async (req, res) => {

    const { heading } = req.body;
    const img = req.file.filename;
    const today = new Date();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[today.getMonth()];

    const year = today.getFullYear()
    const date = `${monthName}, ${year}`;

    if (!img || !heading || !date)
        return validationErrorWithData(res, "blog data not found");

    try {
        await blogs.create({
            heading,
            date, img
        })
        return successResponse(res, "Blog added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "Blog not added");
    }
}