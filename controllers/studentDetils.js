const studentForm = require('../models/studentDetails');
const {successResponse,errorResponse,validationErrorWithData} = require("../helper/apiResponse");

exports.studentForm = async (req, res) => {
    const { name, email, phone, course, joiningTime, message } = req.body;

    console.log("student details",name,email,phone,course,joiningTime,message);
    //data validation
    if (!name || !email || !phone || !course || !joiningTime || !message) {
        validationErrorWithData(res,"data validation failed");
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

       successResponse(res,"data submitted");
    }
    catch (error) {
        console.log("error", error);
      errorResponse(res,"data not submited please verify the data");
    }
}


