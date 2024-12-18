const studentForm = require('../models/studentDetails');
const { successResponse, errorResponse, validationErrorWithData } = require("../helper/apiResponse");

exports.studentForm = async (req, res) => {
    const { name, email, phone, course, joiningTime, message } = req.body;

    //data validation
    if (!name || !email || !phone || !course || !joiningTime || !message) {
        return validationErrorWithData(res, "data validation failed");
    }
    //enter the data into db
    try {
        await studentForm.create(
            {
                name,
                email,
                phone,
                course,
                joiningTime,
                message
            })
       return successResponse(res, "data submitted succesfully");
    }
    catch (error) {
        console.log("error", error);
        return  errorResponse(res, "data not submited please verify the data");
    }
}


