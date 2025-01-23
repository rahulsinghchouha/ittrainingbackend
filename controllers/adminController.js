const { course, bannerImgCourse, courseDetailsBanner } = require("../models/createCourse");
const home = require("../models/home");
const aboutUS = require("../models/aboutUs");
const contactUs = require("../models/contactUs");
const { tags, bannerImgTag } = require("../models/tag");
const mongoose = require('mongoose');
const { student, bannerImgTestimonial } = require("../models/testimonial");
const ourStats = require("../models/ourStats");
const addExploreCategory = require("../models/exploreCategory");
const ourPartners = require("../models/ourPartners");
const { blogs, bannerImgBlog, blogDetailBanner } = require("../models/blog");
const fetch = require('node-fetch');
const bcrypt = require("bcrypt");
const admin = require("../models/admin");
const { validationErrorWithData, successResponse, errorResponse, notFoundResponse, successResponseWithData, duplicateDataError } = require("../helper/apiResponse");

const mailSender = require("../utils/mailSender");

const { loginSuccess } = require("../mail/template/loginSuccess");
const path = require("path");
const fs = require("fs");
const { deleteImage } = require("../config/storeFile");
const exploreCategory = require("../models/exploreCategory");




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
                await mailSender(email, "Login as Admin Succesfully", loginSuccess(email));

                res.redirect("/dashboard")
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
        req.flash('error', 'data not found');
        return res.redirect("/add-home");
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
            const oldImage1 = path.join(__dirname, '../public', homeData.bannerImage);
            deleteImage(oldImage1, "banner Image");

            const oldImage2 = path.join(__dirname, "../public", homeData.bannerBgImg);
            deleteImage(oldImage2, "banner bg Image");

            const oldImage3 = path.join(__dirname, "../public", homeData.blogImg);
            deleteImage(oldImage3, "blog img");

            const oldImage4 = path.join(__dirname, "../public", homeData.maximizeCareerImg);
            deleteImage(oldImage4, "maximize career img");

            const oldImage5 = path.join(__dirname, "../public", homeData.beforeCollegeImg);
            deleteImage(oldImage5, "before college image");


            await home.findByIdAndUpdate(homeData._id, { $set: newhomeData }, { new: true });
            req.flash('success', 'Home added succesfully');
            return res.redirect("/add-home");
        }
        else {
            const newHome = new home(newhomeData);
            await newHome.save();
            req.flash('success', 'Home added succesfully');
            return res.redirect("/add-home");
        }
    }
    catch (error) {
        console.log(error);
        req.flash('error', 'Home not added please try again');
        return res.redirect("/add-home");
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
        req.flash('error', 'data not found');
        return res.redirect("/dashboard");
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
            req.flash('success', 'Dashboard updated succesfully')
            return res.redirect("/dashboard");
        }
        else {
            req.flash('error', 'dashboard not updated');
            return res.redirect("/dashboard");
        }
    }
    catch (error) {
        req.flash('error', 'dashboard not updated');
        return res.redirect("/dashboard");
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
        req.flash('error', 'Enter all the require field');
        return res.redirect("/add-course");
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
        req.flash('success', 'Course added succesfully');
        return res.redirect("/add-course");
    }
    catch (error) {
        console.log(error);
        req.flash('error', 'course not added please try again');
        return res.redirect("/add-course");
    }
}
exports.getCourseById = async (req, res) => {

    const { courseId } = req.body;

    if (!courseId) {
        return validationErrorWithData(res, "not getting the course Id");
    }
    try {
        const data = await course.findById(courseId);
        if (!data)
            return notFoundResponse(res, "course not found");

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
        req.flash('error', 'course not found please try again');
        return res.redirect(`/update-course/${courseId}`);
    }
    const updatedCourse = {
        courseName, category, overview, keyAreas, toolsInHand, benefits, courseCurricullum, keyHighLights, certificate, jobRoles, fAQ
    }
    try {
        const courseDetails = await course.findById(courseId);
        if (!courseDetails) {
            console.log("course not found", courseDetails);
            req.flash('error', 'course not found please try again');
            return res.redirect(`/update-course/${courseId}`);
        }
        if (img) {
            const oldImage = path.join(__dirname, "../public", courseDetails?.img);
            deleteImage(oldImage, "course image");
            updatedCourse.img = img;
        }
        await course.findByIdAndUpdate(courseDetails._id, { $set: updatedCourse }, { new: true });
        req.flash('success', 'course updated succesfully');
        return res.redirect(`/update-course/${courseId}`);
    }
    catch (error) {
        console.log("Error to update the course ", error);
        req.flash('error', 'course not updated please try again');
        return res.redirect(`/update-course/${courseId}`);
    }
}
exports.deleteCourse = async (req, res) => {

    const { id } = req.body;
    if (!id) {
        console.log("course id not found");
        req.flash('error', 'course not found');
        return res.redirect('/course');
    }
    try {

        // const courseDetails = await course.findById(id);
        // if (!courseDetails) {
        //     console.log("course not found",courseDetails);
        // req.flash('error', 'course');
        // return res.redirect('/course');
        // }

        // const oldImage = path.join(__dirname, "../public", courseDetails.img);
        // deleteImage(oldImage, "course image");

        // await course.findByIdAndDelete(id);
        req.flash('success', 'course deleted succesfully ggg');
        return res.redirect("/course");
    }
    catch (error) {
        console.log("Course not found ", error);
        req.flash('error', 'course not deleted please try again');
        return res.redirect('/course');
    }
}
exports.addCourseBannerImage = async (req, res) => {
    const img = req.file?.filename;
    const { coursePageHeading } = req.body;

    if (!img || !coursePageHeading) {
        req.flash('error', 'Enter all the require field');
        return res.redirect('/add-course');
    }
    const newData = {
        img,
        coursePageHeading
    }
    try {
        const bannerData = await bannerImgCourse.findOne({});

        if (bannerData) {

            deleteImage(path.join(__dirname, "../public", bannerData.img), "course banner image");

            await bannerImgCourse.findByIdAndUpdate(bannerData._id, { $set: newData }, { new: true });
            // return successResponse(res, "course page updated succesfully");
        }
        else {
            await bannerImgCourse.create({ newData });
            // return successResponse(res, "course banner added succesfully");
        }
        req.flash('success', 'course banner added');
        return res.redirect('/add-course');
    }
    catch (error) {
        console.log(error);
        req.flash('error', 'course banner not added please try again ');
        return res.redirect('/add-course');
    }
}
exports.updateCourseBanner = async (req, res) => {
    const img = req.file?.filename;
    const { coursePageHeading, bannerId } = req.body;

    //validation
    if (!bannerId || !coursePageHeading) {
        req.flash('error', 'Enter all the require fields');
        return res.redirect('/course');
    }
    try {
        const banner = await bannerImgCourse.findById(bannerId);
        if (!banner) {
            req.flash('error', 'banner not found');
            return res.redirect('/course');
        }
        const updatedBanner = { coursePageHeading };
        if (img) {
            deleteImage(path.join(__dirname, "../public", banner.img), "course banner image");
            updatedBanner.img = img;
        }
        await bannerImgCourse.findByIdAndUpdate(banner._id, { $set: updatedBanner }, { new: true });
        req.flash('success', 'course banner updated succesfully');
        return res.redirect('/course');
    }
    catch (error) {
        console.log("error to update the banner", error);
        req.flash('error', 'course banner not updated');
        return res.redirect('/course');
    }
}
exports.addCourseDetailBanner = async (req, res) => {
    const img = req.file?.filename;

    if (!img)
    {
        req.flash('error', 'img not found');
        return res.redirect("/add-course");
    }
        

    try {
        const banner = await courseDetailsBanner.findOne({});
        if (banner) {
            deleteImage(path.join(__dirname, "../public", banner.img), "course details banner img");
            banner.img = img;
            await banner.save();
        }
        else {
            await courseDetailsBanner.create({ img });
        }
        req.flash('success', 'img updated succesfully');
        return res.redirect("/add-course");
    }
    catch (error) {
        console.log("error to update the course banner img", error);
        req.flash('error', 'course details banner not updated');
        return res.redirect("/add-course");
    }
}

//------------------- ABOUT US ------------------
exports.addAboutUS = async (req, res) => {

    const { yourImaginationHead, totalStudentJoined, ourJourneyHead, ourBeliefsHead, ourMissionHead, missionDetails, visionDetails, valuesDetails } = req.body;

    const { bannerImage, yourImaginationImg, ourJourneyImg, ourBeliefImg, ourMissionImg } = req.files;

    //console.log(yourImaginationHead, totalStudentJoined, ourJourneyHead, ourBeliefsHead, ourMissionHead, missionDetails, visionDetails, valuesDetails, bannerImage, yourImaginationImg, ourJourneyImg, ourBeliefImg, ourMissionImg)

    if (!yourImaginationHead || !totalStudentJoined || !ourJourneyHead || !ourBeliefsHead || !ourMissionHead || !missionDetails || !visionDetails || !valuesDetails
        || !bannerImage || !yourImaginationImg || !ourJourneyImg || !ourBeliefImg || !ourMissionImg) {
        req.flash('error', 'Enter all the require field');
        return res.redirect('/add-aboutUs');
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
            const oldImage1 = path.join(__dirname, "../public", aboutData.bannerImage);
            deleteImage(oldImage1, "banner Image");

            const oldImage2 = path.join(__dirname, "../public", aboutData.yourImaginationImg);
            deleteImage(oldImage2, "your imagination image");

            const oldImage3 = path.join(__dirname, "../public", aboutData.ourJourneyImg);
            deleteImage(oldImage3, "our journey image");

            const oldImage4 = path.join(__dirname, "../public", aboutData.ourBeliefImg);
            deleteImage(oldImage4, "our belief image");

            const oldImage5 = path.join(__dirname, "../public", aboutData.ourMissionImg);
            deleteImage(oldImage5, "Our Mission Image");


            await aboutUS.findByIdAndUpdate(aboutData._id, { $set: aboutUsData }, { new: true });
            req.flash('success', 'About us added succesfully');
            return res.redirect('/add-aboutUs');
        }
        else {
            const newabout = new aboutUS(aboutUsData);
            await newabout.save();
            req.flash('success', 'About us added succesfully');
            return res.redirect('/add-aboutUs');
        }
    }
    catch (error) {
        console.log(error);
        req.flash('error', 'about us not added please try again');
        return res.redirect('/add-aboutUs');
    }

}

exports.updateAboutUs = async (req, res) => {
    //get the data 
    const { yourImaginationHead, totalStudentJoined, ourJourneyHead, ourBeliefsHead, ourMissionHead, missionDetails, visionDetails, valuesDetails } = req.body;

    const { bannerImage, yourImaginationImg, ourJourneyImg, ourBeliefImg, ourMissionImg } = req.files;

    //validate that data 

    if (!yourImaginationHead || !totalStudentJoined || !ourJourneyHead || !ourBeliefsHead || !ourMissionHead || !missionDetails || !visionDetails || !valuesDetails) {
        req.flash('error', 'Please Enter all the require field');
        return res.redirect('/about-us');
    }

    try {
        const about = await aboutUS.findOne({});

        if (!about) {
            req.flash('error', 'about us not found');
            return res.redirect('/about-us');
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

        req.flash('success', 'about us updated succesfully');
        return res.redirect('/about-us');

    }
    catch (error) {
        console.log("Error to update the course", error);
        req.flash('error', 'Error to update the home page');
        return res.redirect('/about-us');
    }
}


//----------------ADD Testimonial-----------
exports.addStudentPlaced = async (req, res) => {
    const { name, profile, experience } = req.body;
    const img = req.file?.filename;
    console.log(name, profile, experience, img);
    //validation
    if (!name || !profile || !experience || !img) {
        req.flash('error', 'Please Enter all the require field');
        return res.redirect('/new-testimonial');
    }

    try {
        await student.create({
            name,
            experience,
            img,
            profile
        })
        req.flash('success', 'Testimonial added succesfully');
        return res.redirect('/new-testimonial');
    }
    catch (error) {
        console.log("Error", error);
        req.flash('error', 'testimonail not added');
        return res.redirect('/new-testimonial');
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
    {
        req.flash('error', 'testimonail not found');
        return res.redirect('/our-testimonial');
    }
        

    try {
        // const testimonial = await student.findById(id);
        // if (!testimonial) {
        //     req.flash('error', 'testimonail not found');
        //     return res.redirect('/our-testimonial');
        // }
        // if (testimonial.img) {
        //     const oldImage = path.join(__dirname, "../public", testimonial.img);
        //     deleteImage(oldImage, "testimonial Image");
        // }
        // await student.deleteOne(testimonial._id);
        req.flash("success", "Testimonial deleted successfully");
        res.status(200).json({ redirect: "/our-testimonial" }); // Send redir
    }
    catch (error) {
        console.log("Error to delete the testimonial", error);
        req.flash('error', 'testimonail not deleted');
        return res.redirect('/our-testimonial');
    }
}
exports.addTestimonialBanner = async (req, res) => {

    const img = req.file?.filename;

    if (!img) {
        req.flash('error', 'Img not found');
         return res.redirect('/new-testimonial');
    }

    try {
        const banner = await bannerImgTestimonial.findOne({});
        if (banner) {
            deleteImage(path.join(__dirname, "../public", banner.img), "testimonial banner img");
            banner.img = img;
            await banner.save();
        }
        else {
            await bannerImgTestimonial.create({ img });
        }
        req.flash('success', 'Testimonial Banner added succesfully');
        return res.redirect('/new-testimonial');

    }
    catch (error) {
        console.log("Error to update the testimonial banner", error);
        req.flash('error', 'Testimonial Banner not added please try again');
        return res.redirect('/new-testimonial');

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
            const oldImage = path.join(__dirname, "../public", contactData.bannerImg);
            deleteImage(oldImage, "banner image contactus");

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
        req.flash("error", "Enter all the require field");
        return res.redirect('/add-ourStats')
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
        }
        else {
            await ourStats.create(newStats);
        }
        req.flash("success", "stats updated succesfully");
        return res.redirect('/add-ourStats');
    }
    catch (error) {
        console.log("error to update the stats", error);
        req.flash("error", "Error to update the stats");
        return res.redirect('/add-ourStats')
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

        req.flash('error', 'Please Enter all the require field');
        return res.redirect("/add-categories");
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
        req.flash('success', 'Category Created succesfully');
        return res.redirect("/add-categories");
    }
    catch (error) {
        console.log(error);
        req.flash('error', 'Category not created please try again');
        return res.redirect("/add-categories");
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
        req.flash('error', 'category not found');
        return res.redirect("/add-categories");
    }
    try {
        const category = await exploreCategory.findById(id);
        if (!category) {
            req.flash('error', 'category not found');
            return res.redirect("/add-categories");
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
        req.flash('success', 'category deleted succesfully');
        return res.redirect("/add-categories");

    }
    catch (error) {
        console.log("Error in categories deletion", error);
        req.flash('error', 'category not deleted please try again');
        return res.redirect("/add-categories");
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
        req.flash('error', 'please enter all the require details');
        return res.redirect(`/update-category/${categoryId}`);
    }

    const updateCategory = {
        heading, para, categoryDetailsWhy, importance, detailsCard, impPara, processGrowthandSkill
    }
    try {
        const category = await exploreCategory.findById(categoryId);

        if (!category) {
            req.flash('error', 'category not found');
            return res.redirect(`/update-category/${categoryId}`);
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
        //console.log("updated category", updateCategory.detailsCard);

        await exploreCategory.findByIdAndUpdate(category._id, { $set: updateCategory }, { new: true });

        req.flash('success', 'category updated succesfully');
        return res.redirect(`/update-category/${categoryId}`);
    }
    catch (error) {
        console.log("Error to update the category", error);
        req.flash('error', 'category not updated');
        return res.redirect(`/update-category/${categoryId}`);
    }
}

// --------------------PARTNERS-------------------------
exports.addOurPartners = async (req, res) => {

    const img = req?.file?.filename;

    if (!img) {
        req.flash('error', 'img not found');
        return res.redirect("/add-partners")
    }

    try {
        await ourPartners.create({ img: img });
        req.flash('success', 'partner added succesfully');
        return res.redirect("/add-partners")
    }
    catch (error) {
        console.log(error);
        req.flash('error', 'partner not added please try again');
        return res.redirect("/add-partners");
    }

}

exports.updateOurPartners = async (req, res) => {

    const img = req.file?.filename;
    const { partnerId } = req.body;

    if (!img || !partnerId) {
        req.flash('error', 'enter all the require field');
        return res.redirect("/add-partners")
    }

    try {
        const partner = await ourPartners.findById(partnerId);
        //console.log(partner);
        if (!partner) {
            req.flash('error', 'partner not found please try again');
            return res.redirect("/add-partners")
        }
        const oldImage = path.join(__dirname, '../public', partner.img);
        deleteImage(oldImage, "update partner");
        partner.img = img;

        await partner.save();

        req.flash('success', 'partner updated succesfully');
        return res.redirect("/add-partners")
    }
    catch (error) {
        console.log("error", error);
        req.flash('error', 'partner not updated please try again');
        return res.redirect("/add-partners");
    }

}

exports.deleteOurPartner = async (req, res) => {
    const { partnerId } = req.body;
    if (!partnerId) {
        req.flash('error', 'partnerId not found please try again');
        return res.redirect("/add-partners")
    }
    try {

        const partner = await ourPartners.findById(partnerId);

        if (!partner) {
            req.flash('error', 'partner not found ');
            return res.redirect("/add-partners")
        }


        const oldImage = path.join(__dirname, '../public', partner.img);
        deleteImage(oldImage, " partner image");


        await ourPartners.findByIdAndDelete(partnerId);
        req.flash('success', 'partner deleted succesfully');
        return res.redirect("/add-partners")
    }
    catch (error) {
        console.log("error to delete partner", error);
        req.flash('error', 'partner not deleted please try again');
        return res.redirect("/add-partners");
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
exports.getBlogById = async (req, res) => {
    const { blogId } = req.body;
    if (!blogId) {
        return validationErrorWithData(res, "Blog id not found");
    }
    try {
        const data = await blogs.findById(blogId);
        if (!data)
            return notFoundResponse(res, "blog not found");


        return successResponse(res, "blog found succesfully", data);
    }
    catch (error) {
        console.log("blog not found", error);
        return errorResponse(res, "blog not found");
    }
}
exports.addBlogBanner = async (req, res) => {

    const img = req.file?.filename;

    if (!img) {
        return validationErrorWithData(res, "Blog banner img not found ");
    }
    try {
        const banner = await bannerImgBlog.findOne({});

        if (banner) {
            deleteImage(path.join(__dirname, "../public", banner?.img), "blog banner image");
            banner.img = img;
            await banner.save();
        }
        else {
            await bannerImgBlog.create({ img });
        }
        return successResponse(res, "blog banner img add succesfully");
    }
    catch (error) {
        console.log("Error to update the blog banner img", error);
        return errorResponse(res, "blog banner not updated");
    }
}
exports.addBlogDetailBanner = async (req, res) => {
    const img = req.file?.filename;

    if (!img)
        return validationErrorWithData(res, "blog detail banner img not found");

    try {
        const banner = await blogDetailBanner.findOne({});

        if (banner) {
            deleteImage(path.join(__dirname, "../public", banner.img), "blog detail banner");
            banner.img = img;
            await banner.save();
        }
        else {
            await blogDetailBanner.create({ img });
        }
        return successResponse(res, "banner uploaded succesfully");
    }
    catch (error) {
        console.log("error to upload image", error);
        return errorResponse(res, "blog detail banner not updated");
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
        return successResponse(res, "tag deleted succesfully");
    }
    catch (error) {
        console.log("error to delete the tag", error);
        return errorResponse(res, "tag not deleted");
    }

}
exports.updateTag = async (req, res) => {

    const { tagId, tag } = req.body;

    if (!tagId || !tag)
        return validationErrorWithData(res, "tag not found");
    // Validate tag ID format
    if (!mongoose.isValidObjectId(tagId)) {
        return validationErrorWithData(res, "Invalid tag ID format");
    }
    try {
        await tags.findByIdAndUpdate(tagId, { $set: { tag } }, { new: true });
        return successResponse(res, "tag updated succesfully");
    }
    catch (error) {
        console.log("error to update the tag", error);
        return errorResponse(res, "tag not updated");
    }
}
exports.addTagBanner = async (req, res) => {

    const img = req?.file?.filename;
    if (!img)
        return validationErrorWithData(res, "tag banner not found");

    try {
        const banner = await bannerImgTag.findOne({});

        if (banner) {
            deleteImage(path.join(__dirname, "../public", banner.img), "tag banner img");
            banner.img = img;
            await banner.save();
        }
        else {
            await bannerImgTag.create({ img });
        }
        return successResponse(res, "tag banner created succesfully");
    }
    catch (error) {
        console.log("error to add tag banner", error);
        return errorResponse(res, "error to add tag banner");
    }
}

