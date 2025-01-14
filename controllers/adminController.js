const { course, bannerImgCourse } = require("../models/createCourse");
const home = require("../models/home");
const aboutUS = require("../models/aboutUs");
const contactUs = require("../models/contactUs");
const { tags } = require("../models/tag");

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

// ADD HOME
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

//update Home 

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

//ADD COURSE
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



// ADD ABOUT US
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

//ADD Testimonial
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

//ADD Contact US
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
    files.forEach(file => {

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

    // console.log("img",img);

    // console.log("request body",req.body.partnerId);

    if (!img || !partnerId) {
        return validationErrorWithData(res, "img or partnerId not found");
    }

    try {
        const partners = await ourPartners.find();
        const updatePartner = partners[partnerId];
        const oldImage = path.join(__dirname, '../public', updatePartner.img);
        deleteImage(oldImage, "update partner");
        updatePartner.img = img;

        await updatePartner.save();

        return successResponse(res, "partner updated");
    }
    catch (error) {
        console.log("error", error);
        return errorResponse(res, "error to fetch the partners");
    }

}

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