const studentForm = require('../models/studentDetails');

exports.studentForm = async (req, res) => {

    const { name, email, phone, course, joiningTime, message } = req.body;

    console.log("student details",name,email,phone,course,joiningTime,message);
    //data validation
    if (!name || !email || !phone || !course || !joiningTime || !message) {
        return res.status(400).json({
            success: false,
            message: "data missing"
        })
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

        return res.status(200).json({
            success: true,
            message: "data submitted"
        })
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "data not submitted please try again"
        })
    }
}


