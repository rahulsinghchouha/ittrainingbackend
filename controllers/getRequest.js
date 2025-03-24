const { course, bannerImgCourse, courseDetailsBanner } = require('../models/createCourse');
const { student,bannerImgTestimonial } = require('../models/testimonial');
const ourPartners = require("../models/ourPartners");
const exploreCategory = require("../models/exploreCategory");
const ourStats = require("../models/ourStats");
const { blogs , bannerImgBlog , blogDetailBanner} = require("../models/blog")
const home = require('../models/home');
const aboutUs = require("../models/aboutUs");
const { tags,bannerImgTag } = require("../models/tag");

const { successResponse, errorResponse, validationErrorWithData, successResponseWithData, notFoundResponse } = require("../helper/apiResponse");

const contactUs = require('../models/contactUs');


exports.getHome = async (req, res) => {
    try {
        const data = await home.findOne({});
        if(!data)
            return notFoundResponse(res,"Home Page not found");

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
        if(!data)
            return notFoundResponse(res,"course not found");


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
        if(!data)
            return notFoundResponse(res,"course banner image not found");


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
        if(!data)
            return notFoundResponse(res,"course details banner not");


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
        if(!data)
            return notFoundResponse(res,"about us not found");


        successResponseWithData(res, "about us data get succesfuly", data);
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "about us data not found");
    }
}
//Testimonial
exports.getStudentPlaced = async (req, res) => {
    try {
        const data = await student.find();
        if(!data)
            return notFoundResponse(res,"placed student not found");


        successResponseWithData(res, "placed student get succesfully", data);

    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get the student placed");
    }
}
exports.getTestimonialBanner = async (req,res) =>{
    try{
        const data = await bannerImgTestimonial.findOne({});
        if(!data)
            return notFoundResponse(res,"testimonial banner not found");

        return successResponseWithData(res,"tesimonial banner found",data);
      }
    catch(error)
    {
        console.log("error to get testimonial banner",error);
        return errorResponse(res,"testimonial banner not found");
    }

}



exports.getPartners = async (req, res) => {
    try {
        const data = await ourPartners.find();
        if(!data)
            return notFoundResponse(res,"partners not found");


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
        if(!data)
            return notFoundResponse(res,"category not found");
 
        successResponseWithData(res, "explore card get succesfully return", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error to get explore card");

    }
}
exports.getCategoryByName = async (req, res) => {

    const { categories } = req.query;
    
    if (!categories) {
        return validationErrorWithData(res, "name not found");
    }
    try {
        const data = await exploreCategory.findOne({ heading: { $regex: categories, $options: 'i' } });

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
        if(!data)
            return notFoundResponse(res,"our stats not found");


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
exports.getBlogDetailBanner = async(req,res)=>{
    try{
            const data = await blogDetailBanner.findOne({});
            if(!data)
                return notFoundResponse(res,"blog banner not found");

            return successResponseWithData(res,"blog details banner found",data);
    }
    catch(error)
    {
        console.log("blog detail banner not  found",error);
        return errorResponse(res,"blog details banner not found");
    }
}

//TAG
exports.getTags = async (req, res) => {
    try {
        // console.log("tag controller call");
        const data = await tags.find();
        if(!data)
            return notFoundResponse(res,"Tags not found");

        // console.log("tag data", data);
        return successResponseWithData(res, "data get succesfully", data);
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "data not get please try again");
    }
}
exports.getTagBanner = async(req,res) =>{
    try{
            const data = await bannerImgTag.findOne({});
                if(!data)
                    return notFoundResponse(res,"tag banner not found",)

            return successResponseWithData(res,"tag banner get succesfully",data);
    }
    catch(error)
    {
        console.log("error to get the tag banner",error);
        return errorResponse(res,"tag banner not get");
    }
}

exports.getContactUs = async (req, res) => {
    try {

        const data = await contactUs.findOne({});
        if(!data)
            return notFoundResponse(res,"contact us not found");


        successResponseWithData(res, "Contact us get Succesfully", data);
    }
    catch (error) {
        console.log(error);
        errorResponse(res, "error To fetch the data");
    }
}
