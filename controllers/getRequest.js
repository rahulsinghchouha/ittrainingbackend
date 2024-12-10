const courseCard = require('../models/courseCard');
const studentPlaced = require('../models/studentPlaced');
const ourPartners = require("../models/ourPartners");

const { successResponse, errorResponse, validationErrorWithData, successResponseWithData } = require("../helper/apiResponse");

exports.getCourseCard = async (req, res) => {
    try {
        const data = await courseCard.find();

        return successResponseWithData(res, "course card get succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the course card");
    }

}
exports.getStudentPlaced = async (req, res) => {
    try {
        const data = await studentPlaced.find();

        return successResponseWithData(res, "placed student get succesfully", data);

    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the student placed");
    }
}
exports.getPartners = async (req, res) => {
    try {
        const data = await ourPartners.find();
        return successResponseWithData(res, "partners get succesfully", data);

    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the our partners");
    }
}