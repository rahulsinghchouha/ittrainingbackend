const courseCard = require("../models/courseCard");
const {successResponse,errorResponse,validationErrorWithData} = require("../helper/apiResponse");


exports.addCourseCard = async (req, res) => {

    const { category, heading, para } = req.body;
    const img = req.file?.originalname;

    if (!category || !heading || !para || !img) {
       validationErrorWithData(res,"card data validation failed");
    }
    try {
        await courseCard.create({
            category,
            heading,
            para,
            img
        })

        successResponse(res,"course card added succesfully");
    }
    catch (error) {
        console.log("error",error);
       errorResponse(res,"card not added ")
    }
}

