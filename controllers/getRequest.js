const { course } = require('../models/createCourse');
const { student } = require('../models/testimonial');
const ourPartners = require("../models/ourPartners");
const exploreCategory = require("../models/exploreCategory");
const ourStats = require("../models/ourStats");
const { blogs } = require("../models/blog")
const home = require('../models/home');
const aboutUs = require("../models/aboutUs");


const { successResponse, errorResponse, validationErrorWithData, successResponseWithData } = require("../helper/apiResponse");
const { TbWashDryP } = require('react-icons/tb');
const contactUs = require('../models/contactUs');


exports.getHome = async (req, res) => {
    try {
        const data = await home.findOne({});
        successResponseWithData(res, "home data get succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get home data");
    }
}


exports.getCourseCard = async (req, res) => {
    try {
        const data = await course.find();
        successResponseWithData(res, "course card get succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the course card");
    }
}

exports.getAboutUs = async (req, res) => {
    try {
        const data = await aboutUs.findOne({});
        successResponseWithData(res, "about us data get succesfuly", data);
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "about us data not found");
    }
}
exports.getStudentPlaced = async (req, res) => {
    try {
        const data = await student.find();
        successResponseWithData(res, "placed student get succesfully", data);

    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the student placed");
    }
}
exports.getPartners = async (req, res) => {
    try {
        const data = await ourPartners.find();
        successResponseWithData(res, "partners get succesfully", data);

    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the our partners");
    }
}
exports.getExploreCard = async (req, res) => {
    try {
        const data = await exploreCategory.find();
        successResponseWithData(res, "explore card get succesfully return", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get explore card");

    }
}
exports.getOurStats = async (req, res) => {
    try {
        const data = await ourStats.find();
        successResponseWithData(res, "our stats get succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get our stats card");
    }
}
exports.getBlogs = async (req, res) => {
    try {
        const data = await blogs.find();
        successResponseWithData(res, "Blogs get succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the Blogs");

    }
}

exports.getContactUs = async(req,res) =>{
    try{
            const data = await contactUs.findOne({});
            successResponseWithData(res,"Contact us get Succesfully",data);
    }
    catch(error)
    {
        console.log(error);
        errorResponse(res,"error To fetch the data");
    }
}

