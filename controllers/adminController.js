const courseCard = require("../models/courseCard");
const studentPlaced = require("../models/studentPlaced");
const ourStats = require("../models/ourStats");
const { successResponse, errorResponse, validationErrorWithData } = require("../helper/apiResponse");


exports.addCourseCard = async (req, res) => {

    const { category, heading, para } = req.body;
    const img = req.file?.originalname;

    if (!category || !heading || !para || !img) {
        return validationErrorWithData(res, "card data validation failed");
    }
    try {
        await courseCard.create({
            category,
            heading,
            para,
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
    const img = req.file?.originalname;
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
exports.exploreCategory = async(req,res) =>{

    
    console.log(req.body);
    console.log("files---",req.files);


}