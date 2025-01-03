const { course } = require("../models/createCourse");
const home = require("../models/home");

const studentPlaced = require("../models/testimonial");
const ourStats = require("../models/ourStats");
const addExploreCategory = require("../models/exploreCategory");
const ourPartners = require("../models/ourPartners");
const { blogs } = require("../models/blog");

const bcrypt = require("bcrypt");
const admin = require("../models/admin");
const { validationErrorWithData, successResponse, errorResponse, notFoundResponse, successResponseWithData } = require("../helper/apiResponse");

const mailSender = require("../utils/mailSender");

const { loginSuccess } = require("../mail/template/loginSuccess");


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

    const homeData = {
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
        const existingHome = await home.findOne({});

        if (existingHome) {
            await home.findByIdAndUpdate(existingHome._id, { $set: homeData }, { new: true });
            return successResponseWithData(res, "Home Added Succesfully");
        }
        else {
            const newHome = new home(homeData);
            await newHome.save();
            return successResponseWithData(res, "Home Added Succesfully");
        }

    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "home not added please Enter valid data and submit again")

    }
}

//ADD COURSE
exports.addCourse = async (req, res) => {

    const { courseName, category, overview, keyAreas, toolsInHand, benefits, eligibility, courseDuration, feeOptions, courseCurricullum, keyHighLights, jobRoles, fAQ } = req.body;

    const img = req.file?.filename;

    const filterKeyAreas = keyAreas?.filter(value => value != undefined && value != null);
    const filterCourseCurricullum = courseCurricullum?.filter(value => value != undefined && value != null);
    const filterFAQ = fAQ?.filter(value => value != undefined && value != null);

    console.log(filterKeyAreas, filterCourseCurricullum, filterFAQ);

    // console.log(courseName,category, overview, keyAreas, toolsInHand,benefits, eligibility, courseDuration, feeOptions, courseCurricullum,keyHighLights, jobRoles,fAQ, img);

    if (!courseName || !category || !overview || !filterKeyAreas || !toolsInHand || !benefits || !eligibility || !courseDuration || !feeOptions || !filterCourseCurricullum || !keyHighLights || !jobRoles || !filterFAQ || !img) {
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
            eligibility,
            courseDuration,
            feeOptions,
            courseCurriculum: filterCourseCurricullum,
            keyHighLights,
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

// ADD ABOUT US
exports.addAboutUS = async(req,res)=>{
    console.log(req.body);
    console.log(req.files);







}






exports.addStudentPlaced = async (req, res) => {

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

    const { heading, para } = req.body;
    const bgImage = req.files?.bgImage[0]?.filename;
    const img = req.files?.img[0]?.filename;

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
exports.addBlog = async (req, res) => {
    const { heading, details } = req.body;
    const img = req.file?.filename;
    if (!heading || !details || !img) {
        return validationErrorWithData(res, "All the fields required to create a blog");
    }
    try {
        await blogs.create({
            heading,
            details,
            img
        })
        return successResponse(res, "blog added succesfully");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, "blog not added please try again");
    }
}