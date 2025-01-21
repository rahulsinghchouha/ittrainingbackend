const { course, bannerImgCourse, courseDetailsBanner } = require('../models/createCourse');
const { student } = require('../models/testimonial');
const ourPartners = require("../models/ourPartners");
const exploreCategory = require("../models/exploreCategory");
const ourStats = require("../models/ourStats");
const { blogs , bannerImgBlog} = require("../models/blog")
const home = require('../models/home');
const aboutUs = require("../models/aboutUs");
const { tags } = require("../models/tag");

const { successResponse, errorResponse, validationErrorWithData, successResponseWithData, notFoundResponse } = require("../helper/apiResponse");

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
exports.getCourseBanner = async (req, res) => {
    try {
        const data = await bannerImgCourse.findOne({});
        successResponseWithData(res, "course banner get succesfully", data);
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "Error to get the data");
    }
}
exports.getCourseDetailsBanner = async (req, res) => {
    try {
        const data = await courseDetailsBanner.findOne({});
        if(!data) return notFoundResponse(res,"course details banner not found");  
        
        return successResponseWithData(res, "course details found succesfully", data);
    }
    catch (error) {
        console.log("error to find the course banner", error);
        return errorResponse(res, "course details banner not found");

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
exports.getCategoryByName = async (req, res) => {

    const { name } = req.query;

    if (!name) {
        return validationErrorWithData(res, "name not found");
    }
    try {
        const data = await exploreCategory.findOne({ heading: { $regex: name, $options: 'i' } });

        if (!data)
            return notFoundResponse(res, "category not found");

        return successResponseWithData(res, "category found succesfully", data);
    }
    catch (error) {
        console.log("category not found", error);
        return errorResponse(res, "category not find");
    }
}

exports.getOurStats = async (req, res) => {
    try {
        const data = await ourStats.findOne({});
        successResponseWithData(res, "our stats get succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get our stats card");
    }
}
//BLOG
exports.getBlogs = async (req, res) => {
    try {
        const data = await blogs.find();
        if(!data) return notFoundResponse(res,"blog not found");

        successResponseWithData(res, "Blogs get succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the Blogs");

    }
}
exports.getBlogBanner = async(req,res) =>{
    try{
        const data = await bannerImgBlog.findOne({});

        if(!data) return notFoundResponse(res,"blog banner not found");

        return successResponseWithData(res,"blog banner get",data);
    }
    catch(error){
        console.log("blog banner not get",error);
        return errorResponse(res,"blog banner not get");
    }
}

exports.getTags = async (req, res) => {
    try {
        // console.log("tag controller call");
        const data = await tags.find();
        // console.log("tag data", data);
        return successResponseWithData(res, "data get succesfully", data);
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "data not get please try again");
    }
}


exports.getContactUs = async (req, res) => {
    try {

        const data = await contactUs.findOne({});

        successResponseWithData(res, "Contact us get Succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error To fetch the data");
    }
}
