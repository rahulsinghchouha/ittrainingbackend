const { course, bannerImgCourse } = require("../models/createCourse");
const home = require("../models/home");
const aboutUS = require("../models/aboutUs");
const contactUs = require("../models/contactUs");
const { tags } = require("../models/tag");
const mongoose = require('mongoose');
const { student } = require("../models/testimonial");
const ourStats = require("../models/ourStats");
const addExploreCategory = require("../models/exploreCategory");
const ourPartners = require("../models/ourPartners");
const { blogs } = require("../models/blog");

const bcrypt = require("bcrypt");
const admin = require("../models/admin");
const { validationErrorWithData, successResponse, errorResponse, notFoundResponse, successResponseWithData, duplicateDataError } = require("../helper/apiResponse");

const mailSender = require("../utils/mailSender");

const { loginSuccess } = require("../mail/template/loginSuccess");
const path = require("path");
const fs = require("fs");
const { deleteImage } = require("../config/storeFile");
const exploreCategory = require("../models/exploreCategory");
const { findByIdAndDelete } = require("../models/studentDetails");



//ADD ADMIN

exports.addAdmin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return validationErrorWithData(res, "data validation failed ");
    }
    try {


        const hashedPassword = await bcrypt.hash(password, 10);


        await admin.create({
            email: email,
            password: hashedPassword,
        })
        return successResponse(res, "Admin added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "Admin not added please try again");

    }
}

// ADMIN LOGIN

exports.adminLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.render("index", { message: "Enter all the require fields" })
    }

    try {

        const isAdmin = await admin.findOne({ email });

        if (!isAdmin) {
            res.render("index", { message: "Admin not Found Please Enter a Valid Email" })
        }

        else {
            const hashedPassword = isAdmin.password;


            const isPassword = await bcrypt.compare(password, hashedPassword);

            if (isPassword) {
                const info = mailSender(email, "Login as Admin Succesfully", loginSuccess(email));
                //  console.log("Info",info);
                res.render("dashboard")
            }
            else {
                res.render("index", { message: "incorrect password" })
            }
        }
    }
    catch (error) {
        console.log(error);
        res.render("index", { message: "Oops! Email and/or password are incorrect" });
    }
}

//------------------ HOME---------------------
exports.addHome = async (req, res) => {

    // 1. Get the data
    const { bannerHeading, chooseCourseHead, upliftYourCareerHead,
        howToStart, maximizeCareerHead, blogHead,
        jobReadyHead, interviewPrepHead, mentorsHead, careerCounsilHead, beforeCollegeHead,
    } = req.body;

    const { bannerImage, bannerBgImg, maximizeCareerImg, blogImg, beforeCollegeImg } = req.files;

    //2. validate the data 
    if (!bannerHeading || !chooseCourseHead || !upliftYourCareerHead
        || !howToStart || !maximizeCareerHead || !blogHead
        || !jobReadyHead || !interviewPrepHead || !mentorsHead || !careerCounsilHead || !beforeCollegeHead
        || !bannerImage || !bannerBgImg || !maximizeCareerImg || !blogImg || !beforeCollegeImg) {
        console.log("Validation error all the fields require for the home page");
        return validationErrorWithData(res, "Please enter all the fields chek how to start field");
    }

    const filterHowToStart = howToStart.filter(value => value != undefined && value != null);

    const newhomeData = {
        bannerHeading, chooseCourseHead, upliftYourCareerHead,
        maximizeCareerHead, blogHead,
        jobReadyHead, interviewPrepHead, mentorsHead, careerCounsilHead, beforeCollegeHead,
        howToStart: filterHowToStart,
        bannerImage: bannerImage[0]?.filename,
        bannerBgImg: bannerBgImg[0]?.filename,
        maximizeCareerImg: maximizeCareerImg[0]?.filename,
        blogImg: blogImg[0]?.filename,
        beforeCollegeImg: beforeCollegeImg[0]?.filename,
    }

    //update the data 
    try {
        //agr home hai then user ne new home ki request send kr di
        const homeData = await home.findOne({});

        if (homeData) {
            const oldImage = path.join(__dirname, '../public', homeData.bannerImage);
            deleteImage(oldImage, "banner Image");
            await home.findByIdAndUpdate(homeData._id, { $set: newhomeData }, { new: true });
            return successResponse(res, "home updated succesfully");
        }
        else {
            const newHome = new home(newhomeData);
            await newHome.save();
            return successResponseWithData(res, "Home Added Succesfully");
        }
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "home not added please Enter valid data and submit again")

    }
}
exports.updateHome = async (req, res) => {
    // 1. Get the data
    const { bannerHeading, chooseCourseHead, upliftYourCareerHead,
        howToStart, maximizeCareerHead, blogHead,
        jobReadyHead, interviewPrepHead, mentorsHead, careerCounsilHead, beforeCollegeHead,
    } = req.body;

    const { bannerImage, bannerBgImg, maximizeCareerImg, blogImg, beforeCollegeImg } = req.files;

    //2. validate the data 
    if (!bannerHeading || !chooseCourseHead || !upliftYourCareerHead
        || !howToStart || !maximizeCareerHead || !blogHead
        || !jobReadyHead || !interviewPrepHead || !mentorsHead || !careerCounsilHead || !beforeCollegeHead) {
        console.log("Validation error all the fields require for the home page");
        return validationErrorWithData(res, "Please enter all the fields chek how to start field");
    }

    //create new object to update them
    const newhomeData = {
        bannerHeading, chooseCourseHead, upliftYourCareerHead,
        maximizeCareerHead, blogHead,
        jobReadyHead, interviewPrepHead, mentorsHead, careerCounsilHead, beforeCollegeHead,
        howToStart,
    }

    try {
        const previousHome = await home.findOne({});

        if (previousHome) {
            //delete previous images from server and add new images on the server 

            if (bannerImage) {
                const oldImage = path.join(__dirname, '../public', previousHome.bannerImage);
                deleteImage(oldImage, "banner Image");
                newhomeData.bannerImage = bannerImage[0]?.filename;
            }
            if (bannerBgImg) {
                const oldImage = path.join(__dirname, "../public", previousHome.bannerBgImg);
                deleteImage(oldImage, "banner bg Image");
                newhomeData.bannerBgImg = bannerBgImg[0]?.filename;
            }
            if (blogImg) {
                const oldImage = path.join(__dirname, "../public", previousHome.blogImg);
                deleteImage(oldImage, "blog img");
                newhomeData.blogImg = blogImg[0]?.filename;
            }
            if (maximizeCareerImg) {
                const oldImage = path.join(__dirname, "../public", previousHome.maximizeCareerImg);
                deleteImage(oldImage, "maximize career img");
                newhomeData.maximizeCareerImg = maximizeCareerImg[0]?.filename;
            }
            if (beforeCollegeImg) {
                const oldImage = path.join(__dirname, "../public", previousHome.beforeCollegeImg);
                deleteImage(oldImage, "before college image");
                newhomeData.beforeCollegeImg = beforeCollegeImg[0]?.filename;
            }
            await home.findByIdAndUpdate(previousHome._id, { $set: newhomeData }, { new: true });
            return successResponse(res, "Home Page updated succesfully")
        }
        else {
            return notFoundResponse(res, "please add the home")
        }
    }
    catch (error) {
        console.log("Error when Update the Home", error);
        return errorResponse(res, "home page not updated");
    }
}

//----------------COURSE------------------
exports.addCourse = async (req, res) => {

    const { courseName, category, overview, keyAreas, toolsInHand, benefits, courseCurricullum, keyHighLights, certificate, jobRoles, fAQ } = req.body;

    const img = req.file?.filename;

    const filterKeyAreas = keyAreas?.filter(value => value != undefined && value != null);
    const filterCourseCurricullum = courseCurricullum?.filter(value => value != undefined && value != null);
    const filterFAQ = fAQ?.filter(value => value != undefined && value != null);

    //console.log(filterKeyAreas, filterCourseCurricullum, filterFAQ);

    // console.log(courseName,category, overview, keyAreas, toolsInHand,benefits, eligibility, courseDuration, feeOptions, courseCurricullum,keyHighLights, jobRoles,fAQ, img);

    if (!courseName || !category || !overview || !filterKeyAreas || !toolsInHand || !benefits || !filterCourseCurricullum || !keyHighLights || !certificate || !jobRoles || !filterFAQ || !img) {
        return validationErrorWithData(res, "Enter all the required fields  to create a course");
    }

    try {
        await course.create({
            courseName,
            img,
            category,
            overview,
            keyAreas: filterKeyAreas,
            toolsInHand,
            benefits,
            courseCurriculum: filterCourseCurricullum,
            keyHighLights,
            certificate,
            jobRoles,
            fAQ: filterFAQ,
        })
        return successResponse(res, "Course added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "Course not added please add valid field and try again");
    }
}
exports.getCourseById = async (req, res) => {

    const { courseId } = req.body;

    if (!courseId) {
        return validationErrorWithData(res, "not getting the course Id");
    }
    try {
        const data = await course.findById(courseId);
        return successResponseWithData(res, "course Details get succesfully", data);
    }
    catch (error) {
        console.log("error to get the course data ", error);
        return errorResponse(res, "course Details not get");
    }
}

exports.updateCourse = async (req, res) => {
    const { courseId, courseName, category, overview, keyAreas, toolsInHand, benefits, courseCurricullum, keyHighLights, certificate, jobRoles, fAQ } = req.body;
    const img = req.file?.filename;
    if (!courseId || !courseName || !category || !overview || !keyAreas || !toolsInHand || !benefits || !courseCurricullum || !keyHighLights || !certificate || !jobRoles || !fAQ) {
        return validationErrorWithData(res, "Enter all the required fields  to create a course");
    }
    const updatedCourse = {
        courseName, category, overview, keyAreas, toolsInHand, benefits, courseCurricullum, keyHighLights, certificate, jobRoles, fAQ
    }
    try {
        const courseDetails = await course.findById(courseId);
        if (!courseDetails) {
            console.log("course not found");
            return notFoundResponse(res, "course not found");
        }
        if (img) {
            const oldImage = path.join(__dirname, "../public", courseDetails?.img);
            deleteImage(oldImage, "course image");
            updatedCourse.img = img;
        }
        await course.findByIdAndUpdate(courseDetails._id, { $set: updatedCourse }, { new: true });
        return successResponse(res, "course updated succesfully");
    }
    catch (error) {
        console.log("Error to update the course ", error);
        return errorResponse(res, "course not updated please try again");
    }
}

exports.deleteCourse = async (req, res) => {

    const { id } = req.body;
    if (!id) {
        return validationErrorWithData(res, "course id not found");
    }
    try {
        await course.findByIdAndDelete(id);
        return successResponse(res, "course deleted succesfully");
    }
    catch (error) {
        console.log("Course not found ", error);
        return errorResponse(res, "course not found")
    }
}

exports.addCourseBannerImage = async (req, res) => {
    const img = req.file?.filename;
    if (!img) {
        return validationErrorWithData(res, "img not found");
    }
    const newImg = {
        img
    }
    try {
        const bannerData = await bannerImgCourse.findOne({});

        if (bannerData) {
            await bannerImgCourse.findByIdAndUpdate(bannerData._id, { $set: newImg }, { new: true });
            return successResponse(res, "img updated succesfully");
        }
        else {
            await bannerImgCourse.create({ img });
            return successResponse(res, "img added succesfully");
        }
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "img not added please try again");
    }
}

//------------------- ABOUT US ------------------
exports.addAboutUS = async (req, res) => {

    const { yourImaginationHead, totalStudentJoined, ourJourneyHead, ourBeliefsHead, ourMissionHead, missionDetails, visionDetails, valuesDetails } = req.body;

    const { bannerImage, yourImaginationImg, ourJourneyImg, ourBeliefImg, ourMissionImg } = req.files;

    //console.log(yourImaginationHead, totalStudentJoined, ourJourneyHead, ourBeliefsHead, ourMissionHead, missionDetails, visionDetails, valuesDetails, bannerImage, yourImaginationImg, ourJourneyImg, ourBeliefImg, ourMissionImg)

    if (!yourImaginationHead || !totalStudentJoined || !ourJourneyHead || !ourBeliefsHead || !ourMissionHead || !missionDetails || !visionDetails || !valuesDetails
        || !bannerImage || !yourImaginationImg || !ourJourneyImg || !ourBeliefImg || !ourMissionImg) {
        return validationErrorWithData(res, "Please Enter all the valid data and try");
    }

    const aboutUsData = {
        yourImaginationHead,
        totalStudentJoined,
        ourJourneyHead,
        ourBeliefsHead,
        ourMissionHead,
        missionDetails,
        visionDetails,
        valuesDetails,
        bannerImage: bannerImage[0]?.filename,
        yourImaginationImg: yourImaginationImg[0]?.filename,
        ourJourneyImg: ourJourneyImg[0]?.filename,
        ourBeliefImg: ourBeliefImg[0]?.filename,
        ourMissionImg: ourMissionImg[0]?.filename,
    }

    try {
        const aboutData = await aboutUS.findOne({});
        //agr about hai then user ne new about ki request send kr di
        if (aboutData) {
            await aboutUS.findByIdAndUpdate(aboutData._id, { $set: aboutUsData }, { new: true });
            return successResponse(res, "about us updated succesfully");
        }
        else {
            const newabout = new aboutUS(aboutUsData);
            await newabout.save();
            return successResponse(res, "about us created sucesfully");
        }
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "about us not added please enter a valid data and try again");
    }

}

exports.updateAboutUs = async (req, res) => {
    //get the data 
    const { yourImaginationHead, totalStudentJoined, ourJourneyHead, ourBeliefsHead, ourMissionHead, missionDetails, visionDetails, valuesDetails } = req.body;

    const { bannerImage, yourImaginationImg, ourJourneyImg, ourBeliefImg, ourMissionImg } = req.files;

    //validate that data 

    if (!yourImaginationHead || !totalStudentJoined || !ourJourneyHead || !ourBeliefsHead || !ourMissionHead || !missionDetails || !visionDetails || !valuesDetails) {
        return validationErrorWithData(res, "Please Enter all the valid data and try");
    }

    try {
        const about = await aboutUS.findOne({});

        if (!about) {
            return notFoundResponse(res, "about us not");
        }
        const updatedAbout = {
            yourImaginationHead,
            totalStudentJoined,
            ourJourneyHead,
            ourBeliefsHead,
            ourMissionHead,
            missionDetails,
            visionDetails,
            valuesDetails
        }

        if (bannerImage) {
            const oldImage = path.join(__dirname, "../public", about.bannerImage);
            deleteImage(oldImage, "banner Image");
            updatedAbout.bannerImage = bannerImage[0]?.filename;
        }
        if (yourImaginationImg) {
            const oldImage = path.join(__dirname, "../public", about.yourImaginationImg);
            deleteImage(oldImage, "your imagination image");
            updatedAbout.yourImaginationImg = yourImaginationImg[0]?.filename;
        }
        if (ourJourneyImg) {
            const oldImage = path.join(__dirname, "../public", about.ourJourneyImg);
            deleteImage(oldImage, "our journey image");
            updatedAbout.ourJourneyImg = ourJourneyImg[0]?.filename;
        }
        if (ourBeliefImg) {
            const oldImage = path.join(__dirname, "../public", about.ourBeliefImg);
            deleteImage(oldImage, "our belief image");
            updatedAbout.ourBeliefImg = ourBeliefImg[0]?.filename;
        }
        if (ourMissionImg) {
            const oldImage = path.join(__dirname, "../public", about.ourMissionImg);
            deleteImage(oldImage, "Our Mission Image");
            updatedAbout.ourMissionImg = ourMissionImg[0]?.filename;
        }


        await aboutUS.findByIdAndUpdate(about._id, { $set: updatedAbout }, { new: true });

        return successResponse(res, "about us updated succesfully");

    }
    catch (error) {
        console.log("Error to update the course", error);
        return errorResponse(res, "about us not updated");
    }

}


//----------------ADD Testimonial-----------
exports.addStudentPlaced = async (req, res) => {
    const { name, profile, experience } = req.body;
    const img = req.file?.filename;
    console.log(name, profile, experience, img);
    //validation
    if (!name || !profile || !experience || !img) {
        return validationErrorWithData(res, "student placed data not found");
    }

    try {
        await student.create({
            name,
            experience,
            img,
            profile
        })
        return successResponse(res, "placed student added succesfully");
    }
    catch (error) {
        console.log("Error", error);
        return errorResponse(res, "student not added please try again");
    }
}
exports.getTestimonialById = async (req, res) => {
    const { testimonialId } = req.body;
    if (!testimonialId) {
        return validationErrorWithData(res, "testimonial not found");
    }
    try {
        const data = await student.findById(testimonialId);
        if (!data)
            return notFoundResponse("Student details not found");

        return successResponseWithData(res, "student details found", data);
    }
    catch (error) {
        console.log("Error to get the testimonial", error);
        return errorResponse(res, "error to get the student details");
    }
}
exports.updateTestimonial = async (req, res) => {
    const { studentId, name, profile, experience } = req.body;
    const img = req.file?.filename;
    //validation
    if (!studentId || !name || !profile || !experience) {
        return validationErrorWithData(res, "data not found");
    }
    try {
        const studentDetails = await student.findById(studentId);
        if (!studentDetails) {
            return notFoundResponse(res, "student details not found");
        }
        const updatedTestimonial = {
            name, profile, experience
        }
        if (img) {
            const oldImage = path.join(__dirname, "../public", studentDetails.img);
            deleteImage(oldImage, "student Image");
            updatedTestimonial.img = img;
        }
        await student.findByIdAndUpdate(studentDetails._id, { $set: updatedTestimonial }, { new: true })
        return successResponse(res, "student updated");
    }
    catch (error) {
        console.log("error to update the data", error);
        return errorResponse(res, "testimonial not updated");
    }
}
exports.deleteTestimonial = async (req, res) => {
    const { id } = req.body;
    if (!id)
        return validationErrorWithData(res, "student id not found");

    try {
        const testimonial = await student.findById(id);
        if (!testimonial) {
            return notFoundResponse(res, "testimonial not found");
        }
        if (testimonial.img) {
            const oldImage = path.join(__dirname, "../public", testimonial.img);
            deleteImage(oldImage, "testimonial Image");
        }
        await student.deleteOne(testimonial._id);
        return successResponse(res, "testimonial deleted succesfully");
    }
    catch (error) {
        console.log("Error to delete the testimonial", error);
        return errorResponse(res, "testimonial not deleted")
    }
}



//------------------Contact US----------
exports.addContactUs = async (req, res) => {
    const { contactUsHead, officeAddress, contactUsNumber, contactUsEmail, officeTiming } = req.body
    const bannerImg = req.file?.filename;
    // console.log(contactUsHead, officeAddress, contactUsNumber, contactUsEmail, officeTiming, bannerImg);
    // validation
    if (!contactUsHead || !officeAddress || !contactUsNumber || !contactUsEmail || !officeTiming || !bannerImg) {
        return validationErrorWithData(res, "enter all the require field and try again");
    }
    //new object
    const newContact = {
        contactUsHead,
        officeAddress,
        contactUsNumber,
        contactUsEmail,
        officeTiming,
        bannerImg
    }
    try {
        //if available 
        const contactData = await contactUs.findOne({});

        if (contactData) {
            await contactUs.findByIdAndUpdate(contactData._id, { $set: newContact }, { new: true });
            return successResponseWithData(res, "contact data added succesfully");
        }
        else {
            const newContactData = new contactUs(newContact);
            await newContactData.save();
            return successResponseWithData(res, "contact data added succesfully");
        }

    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "contact us not added please verify the data and try again");
    }
}
exports.updateContactUs = async (req, res) => {

    const bannerImg = req.file?.filename;
    const { contactUsId, contactUsHead, officeAddress, contactUsNumber, contactUsEmail, officeTiming } = req.body;
    //validation
    if (!contactUsId || !contactUsHead || !officeAddress || !contactUsNumber || !contactUsEmail || !officeTiming) {
        return validationErrorWithData(res, "data not get");
    }
    try {
        const contactUsData = await contactUs.findById(contactUsId);
        if (!contactUsData) {
            return notFoundResponse(res, "contact data not found");
        }
        const updatedContact = {
            contactUsHead, officeAddress, contactUsNumber, contactUsEmail, officeTiming
        }
        if (bannerImg) {
            const oldImage = path.join(__dirname, "../public", contactUsData.bannerImg);
            deleteImage(oldImage, "banner image contactus");
            updatedContact.bannerImg = bannerImg;
        }
        await contactUs.findByIdAndUpdate(contactUsData._id, { $set: updatedContact }, { new: true });
        return successResponse(res, "contact us updated succesfully");
    }
    catch (error) {
        console.log("error to update the contact", error);
        return errorResponse(res, "contact us not updated");
    }
}


//---------------------OUR STATS---------
exports.addOurStats = async (req, res) => {

    const { mentors, experience, placedStudent, yearsOfJourney } = req.body;

    if (!mentors || !experience || !placedStudent || !yearsOfJourney) {
        return validationErrorWithData(res, "our stats data not found");
    }

    const newStats = {
        mentors,
        experience,
        placedStudent,
        yearsOfJourney
    }

    try {

        const stats = await ourStats.findOne({});

        if (stats) {
            await ourStats.findByIdAndUpdate(stats._id, { $set: newStats }, { new: true });
            return successResponse(res, "stats updated succesfully");
        }
        else {
            await ourStats.create(newStats);
            return successResponse(res, "status added succesfully");
        }
    }
    catch (error) {
        return errorResponse(res, "stats not saved please try again");
    }


}

//----------------Explore Category Section---------------
exports.addExploreCategory = async (req, res) => {

    const files = req.files;

    const { heading, para, categoryDetailsWhy, importance, detailsCard, impPara, processGrowthandSkill } = req.body;

    //  Initialize variables for bgImage, img, bannerImg, and detailsCards

    let bgImage = null;
    let img = null;
    let bannerImg = null;
    let categoryDetailsImg = null;
    const detailsCardImg = [];


    // Iterate over files once to categorize them
    files?.forEach(file => {

        if (file.fieldname === "bgImage") {
            bgImage = file.filename;
        }
        else if (file.fieldname === "img") {
            img = file.filename;
        }
        else if (file.fieldname === "bannerImg") {
            bannerImg = file.filename;
        }
        else if (file.fieldname === "categoryDetailsImg") {
            categoryDetailsImg = file.filename;
        }
        else if (file.fieldname.startsWith("detailsCard[")) {
            // Handle detailsCard images using regex
            const indexMatch = file.fieldname.match(/detailsCard\[(\d+)\]\[img\]/);
            if (indexMatch) {
                const index = parseInt(indexMatch[1], 10);
                detailsCardImg[index] = file.filename; // Store by index
            }
        }
    });
    const filterDetailsCardImg = detailsCardImg.filter(value => value != undefined && value != null);

    const filterDetailsCard = detailsCard.filter(value => value != undefined && value != null);

    for (let i = 0; i < filterDetailsCard.length && i < filterDetailsCardImg.length; i++) {
        filterDetailsCard[i].img = filterDetailsCardImg[i];
    }


    // validation then we create this 
    if (!heading || !categoryDetailsImg || !para || !categoryDetailsWhy || !importance || !impPara || !processGrowthandSkill || !filterDetailsCard || !bgImage || !img || !bannerImg || !filterDetailsCardImg) {
        return validationErrorWithData(res, "Please Enter All the field Sinceriously then try again");
    }


    try {
        await addExploreCategory.create({
            heading,
            para,
            bgImage,
            img,
            bannerImg,
            categoryDetailsImg,
            categoryDetailsWhy,
            importance,
            detailsCard: filterDetailsCard,
            impPara,
            processGrowthandSkill
        });
        return successResponse(res, "explore Category Card added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "card not added please verify the data and try again");
    }

}
exports.getCategoryById = async (req, res) => {
    const { categoryId } = req.body;

    // console.log("category Id", categoryId);

    if (!categoryId) {
        return validationErrorWithData(res, "category id not found");
    }
    try {
        const data = await exploreCategory.findById(categoryId);
        // If category not found
        if (!data) {
            return errorResponse(res, "Category not found");
        }
        return successResponseWithData(res, "category details found succesfully", data);
    }
    catch (error) {
        console.log("error to find the category details", error);
        return errorResponse(res, "getting error to find the category details");
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.body;
    // console.log(id);
    if (!id) {
        return validationErrorWithData(res, "id not found");
    }
    try {
        const category = await exploreCategory.findById(id);
        if (!category) {
            return notFoundResponse(res, "category not found");
        }
        if (category.bgImage) {
            const bgImage = path.join(__dirname, "../public", category.bgImage);
            deleteImage(bgImage, "category bg Image");
        }
        if (category.img) {
            const img = path.join(__dirname, "../public", category.img);
            deleteImage(img, "category img");
        }
        if (category.bannerImg) {
            const bannerImg = path.join(__dirname, "../public", category.bannerImg);
            deleteImage(bannerImg, "banner image");
        }
        if (category.categoryDetailsImg) {
            const categoryDetailsImg = path.join(__dirname, "../public", category.categoryDetailsImg);
            deleteImage(categoryDetailsImg, "categoryDetailsimage");
        }
        if (category.detailsCard && category.detailsCard.length) {
            category.detailsCard.forEach(item => {
                if (item.img) {
                    const img = path.join(__dirname, "../public", item.img);
                    deleteImage(img, "card img");
                }
            });
        }
        await exploreCategory.findByIdAndDelete(id);
        return successResponse(res, "category deleted succesfully")

    }
    catch (error) {
        console.log("Error in categories", error);
        return errorResponse(res, "category not found");
    }

}

exports.updateCategory = async (req, res) => {
    const files = req.files;

    const { heading, para, categoryDetailsWhy, importance, detailsCard, impPara, processGrowthandSkill, categoryId } = req.body;

    let bgImage = null;
    let img = null;
    let bannerImg = null;
    let categoryDetailsImg = null;
    const detailsCardImg = [];


    // Iterate over files once to categorize them
    files?.forEach(file => {
        if (file.fieldname === "bgImage") {
            bgImage = file.filename;
        }
        else if (file.fieldname === "img") {
            img = file.filename;
        }
        else if (file.fieldname === "bannerImg") {
            bannerImg = file.filename;
        }
        else if (file.fieldname === "categoryDetailsImg") {
            categoryDetailsImg = file.filename;
        }
        else if (file.fieldname.startsWith("detailsCard[")) {
            // Handle detailsCard images using regex
            const indexMatch = file.fieldname.match(/detailsCard\[(\d+)\]\[img\]/);
            if (indexMatch) {
                const index = parseInt(indexMatch[1], 10);
                detailsCardImg[index] = file.filename; // Store by index
            }
        }
    });

    if (!categoryId || !heading || !para || !categoryDetailsWhy || !importance || !impPara || !processGrowthandSkill || !detailsCard) {
        return validationErrorWithData(res, "Please Enter All the field Sinceriously then try again");
    }

    const updateCategory = {
        heading, para, categoryDetailsWhy, importance, detailsCard, impPara, processGrowthandSkill
    }
    try {
        const category = await exploreCategory.findById(categoryId);

        if (!category) {
            return notFoundResponse(res, "category not found");
        }

        //update card image
        let i = 0;
        for (i; i < detailsCardImg.length && i < category.detailsCard.length; i++) {

            if (detailsCardImg[i]) {
                const oldImage = path.join(__dirname, "../public", category.detailsCard[i]?.img);
                deleteImage(oldImage, `category card image ${i + 1}`);
                updateCategory.detailsCard[i].img = detailsCardImg[i];
            }
            else {
                updateCategory.detailsCard[i].img = category.detailsCard[i].img
            }
        }
        if (i < category.detailsCard.length) {
            for (i; i < category.detailsCard.length; i++) {
                updateCategory.detailsCard[i].img = category.detailsCard[i].img
            }
        }


        //now we update the another images
        if (bgImage) {
            const oldImage = path.join(__dirname, "../public", category.bgImage);
            deleteImage(oldImage, "bgImage");
            updateCategory.bgImage = bgImage;
        }
        if (img) {
            const oldImage = path.join(__dirname, "../public", category.img);
            deleteImage(oldImage, "img");
            updateCategory.img = img;
        }
        if (bannerImg) {
            const oldImage = path.join(__dirname, "../public", category.bannerImg);
            deleteImage(oldImage, "bannerImg");
            updateCategory.bannerImg = bannerImg;
        }
        if (categoryDetailsImg) {
            const oldImage = path.join(__dirname, "../public", category.categoryDetailsImg);
            deleteImage(oldImage, "categoryDetailsimg");
            updateCategory.categoryDetailsImg = categoryDetailsImg;
        }
        console.log("updated category", updateCategory.detailsCard);

        await exploreCategory.findByIdAndUpdate(category._id, { $set: updateCategory }, { new: true });

        return successResponse(res, "category section updated");
    }
    catch (error) {
        console.log("Error to update the category", error);
        return errorResponse(res, "Error to update the category");
    }
}

// --------------------PARTNERS-------------------------
exports.addOurPartners = async (req, res) => {

    const img = req?.file?.filename;

    if (!img) return validationErrorWithData(res, "img not found");

    try {
        await ourPartners.create({ img: img });
        return successResponse(res, "partner added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "partner not added please try again");
    }

}

exports.updateOurPartners = async (req, res) => {

    const img = req.file?.filename;
    const { partnerId } = req.body;

    if (!img || !partnerId) {
        return validationErrorWithData(res, "img or partnerId not found");
    }

    try {
        const partner = await ourPartners.findById(partnerId);
        //console.log(partner);
        const oldImage = path.join(__dirname, '../public', partner.img);
        deleteImage(oldImage, "update partner");
        partner.img = img;

        await partner.save();

        return successResponse(res, "partner updated");
    }
    catch (error) {
        console.log("error", error);
        return errorResponse(res, "error to fetch the partners");
    }

}

exports.deleteOurPartner = async (req, res) => {
    const { partnerId } = req.body;
    if (!partnerId) {
        return validationErrorWithData(res, "partner not found")
    }
    try {
        await ourPartners.findByIdAndDelete(partnerId);
        return successResponse(res, "partner deleted succesfully");
    }
    catch (error) {
        console.log("error to delete partner", error);
        return errorResponse(res, "partner not deleted please try again");
    }
}

//-----------------------BLOG------------------------
exports.addBlog = async (req, res) => {
    const { heading, details, tags, blogCategory } = req.body;
    const img = req.file?.filename;

    const filterTags = [...new Set(tags)];

    if (!heading || !details || !img || !filterTags || !blogCategory) {
        return validationErrorWithData(res, "All the fields required to create a blog");
    }
    try {
        await blogs.create({
            heading,
            details,
            blogCategory,
            img,
            tags: filterTags
        })
        return successResponse(res, "blog added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "blog not added please try again");
    }

}
exports.updateBlog = async (req, res) => {

    const { blogId, heading, blogCategory, details, tags } = req.body;
    const img = req.file?.filename;

    if (!blogId || !heading || !blogCategory || !details || !tags) {
        return validationErrorWithData(res, "require all the details");
    }

    try {

        const blog = await blogs.findById(blogId);

        if (!blog) return notFoundResponse(res, "blog details not found");

        const updatedBlog = {
            heading,
            blogCategory,
            details,
            tags
        }
        if (img) {
            deleteImage(path.join(__dirname, "../public", blog?.img), "blog img");
            updatedBlog.img = img;
        }
        await blogs.findByIdAndUpdate(blogId, { $set: updatedBlog }, { new: true });

        return successResponse(res, "blog details updated succesfully");
    }
    catch (error) {
        console.log("Error to update the blog");
        return errorResponse(res, "blog not updated");
    }

}
exports.deleteBlog = async (req, res) => {
    const { blogId } = req.query;

    if (!blogId) {
        return validationErrorWithData(res, "blog id not found");
    }
    try {
        const blog = await blogs.findById(blogId);
        if (!blog) return notFoundResponse(res, "blog not found");

        if (blog.img)
            deleteImage(path.join(__dirname, "../public", blog.img));

        await blogs.findByIdAndDelete(blogId);
        return successResponse(res, "blog deleted succesfully");
    }
    catch (error) {
        console.log("error to delete the blog", error);
        return errorResponse(res, "blog not deleted");
    }
}
//get-blog-by-id
exports.getBlogById = async (req, res) => {
    const { blogId } = req.body;
    if (!blogId) {
        return validationErrorWithData(res, "Blog id not found");
    }
    try {
        const data = await blogs.findById(blogId);
        return successResponse(res, "blog found succesfully", data);
    }
    catch (error) {
        console.log("blog not found", error);
        return errorResponse(res, "blog not found");
    }
}

//--------------------TAG------------
exports.addTag = async (req, res) => {

    const { tag } = req.body;

    if (!tag) {
        return validationErrorWithData(res, "data not found Please Enter a valid data");
    }

    try {
        await tags.create({ tag });
        return successResponse(res, "Tag added Succesfully");
    }
    catch (error) {
        if (error.code === 11000) {
            return duplicateDataError(res, "Cant add duplicate data ");
        }
        return errorResponse(res, "Please Enter a valid data and try again");
    }

}
exports.deleteTag = async (req, res) => {

    const { tagId } = req.body;

    if (!tagId)
        return validationErrorWithData(res, "tag not found");

    try {
        await tags.findByIdAndDelete(tagId);
        return successResponse(res,"tag deleted succesfully");
       }
    catch (error) {
        console.log("error to delete the tag", error);
        return errorResponse(res, "tag not deleted");
    }

}
exports.updateTag = async(req,res) =>{

    const {tagId,tag} = req.body;

        if (!tagId || !tag)
            return validationErrorWithData(res, "tag not found");
    // Validate tag ID format
    if (!mongoose.isValidObjectId(tagId)) {
        return validationErrorWithData(res, "Invalid tag ID format");
    }
        try {
            await tags.findByIdAndUpdate(tagId,{$set:{tag}},{new:true});
            return successResponse(res,"tag updated succesfully");
           }
        catch (error) {
            console.log("error to update the tag", error);
            return errorResponse(res, "tag not updated");
        }
}

