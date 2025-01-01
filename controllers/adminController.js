const { course } = require("../models/createCourse");
const home = require("../models/home");

const studentPlaced = require("../models/testimonial");
const ourStats = require("../models/ourStats");
const addExploreCategory = require("../models/exploreCategory");
const ourPartners = require("../models/ourPartners");
const blogs = require("../models/blog");

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

exports.addHome = async (req, res) => {

    // 1. Get the data
    const { bannerHeading, bannerPara, chooseCourseHead, chooseCoursePara, upliftYourCareerHead, upliftYourCareerPara,
        howToStart, maximizeCareerHead, maximizeCareerPara, classRoomTraining, industrialTraining, corporateTraining, blogHead, blogPara,
        jobReadyHead, jobReadyPara, interviewPrepHead, interviewPrepPara, mentorsHead, mentorsPara, careerCounsilHead, careerCounsilPara, beforeCollegeHead,
        beforeCollegePara } = req.body;

    const { bannerImage, bannerBgImg, maximizeCareerImg, blogImg, beforeCollegeImg } = req.files;

        //2. validate the data 
    if (!bannerHeading || !bannerPara || !chooseCourseHead || !chooseCoursePara || !upliftYourCareerHead || !upliftYourCareerPara
        || !howToStart || !maximizeCareerHead || !maximizeCareerPara || !classRoomTraining || !industrialTraining || !corporateTraining || !blogHead || !blogPara
        || !jobReadyHead || !jobReadyPara || !interviewPrepHead || !interviewPrepPara || !mentorsHead || !mentorsPara || !careerCounsilHead || !careerCounsilPara || !beforeCollegeHead
        || !beforeCollegePara || !bannerImage || !bannerBgImg || !maximizeCareerImg || !blogImg || !beforeCollegeImg) {
        console.log("Validation error all the fields require for the home page");
        return validationErrorWithData(res, "Please enter all the fields chek how to start field");
    }

    const filterHowToStart = howToStart.filter(value => value != undefined && value != null);

    const homeData = {
        bannerHeading, bannerPara, chooseCourseHead, chooseCoursePara, upliftYourCareerHead, upliftYourCareerPara,
        maximizeCareerHead, maximizeCareerPara, classRoomTraining, industrialTraining, corporateTraining, blogHead, blogPara,
        jobReadyHead, jobReadyPara, interviewPrepHead, interviewPrepPara, mentorsHead, mentorsPara, careerCounsilHead, careerCounsilPara, beforeCollegeHead,
        beforeCollegePara,
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

exports.addCourse = async (req, res) => {
    console.log("HYYYYYYYYYY");

    console.log(req.body);

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
    console.log("i am a partner");
    console.log(req.file);
    const img = req.file.filename;

    //img validation
    //insert image in the our partner section
    //add the partner id to the home section

    // if (!img) return validationErrorWithData(res, "img not found");

    // try {
    //     await ourPartners.create({ img });
    //     return successResponse(res, "partner added succesfully");
    // }
    // catch (error) {
    //     console.log(error);
    //     return errorResponse(res, "partner not added please try again");
    // }

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