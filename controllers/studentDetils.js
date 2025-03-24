const studentForm = require('../models/studentDetails');
const { successResponse, errorResponse, validationErrorWithData } = require("../helper/apiResponse");

const ExcelJs = require('exceljs');
const fs = require('fs');
const path = require('path');

async function checkWorkBook(filePath) {

}


async function saveDataToExcel(name, email, phone, course, joiningTime, message) {

    const filePath = path.join(__dirname, "../", 'studentData.xlsx');

    try {
        let workbook;

        // Step 1: Check if the file exists
        if (fs.existsSync(filePath)) {
            workbook = new ExcelJs.Workbook();
            await workbook.xlsx.readFile(filePath);
        }
        else {
            workbook = new ExcelJs.Workbook();
        }

        // Step 2: Check if the 'Student Data' worksheet exists, otherwise create it

        let worksheet = workbook.getWorksheet('Student Data');


        // const worksheet = workbook.addWorksheet('Student Data');

        if (!worksheet) {

            worksheet = workbook.addWorksheet('Student Data');

            worksheet.columns = [
                { header: 'Date', key: 'date', width: 30 },
                { header: 'Student Name', key: 'name', width: 20 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Phone No.', key: 'phone', width: 20 },
                { header: 'Course Name', key: 'course', width: 50 },
                { header: 'Joining Time', key: 'joiningTime', width: 40 },
                { header: 'Message', key: 'message', width: 50 }
            ]

            const headerRow = worksheet.getRow(1);

            headerRow.font = { bold: true, color: { argb: (36, 145, 90, 0.86) }, size: 14 };
            headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4F81BD' } };  // Blue background
            headerRow.alignment = { horizontal: 'center', vertical: 'middle' };  // Centered text

        }

        // Step 3: Add rows from the user data to the Excel sheet

        worksheet.addRow([new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), name, email, phone, course, joiningTime, message]).height = 25;

        // Step 4: Save the Excel file locally

        await workbook.xlsx.writeFile(filePath);

        return { success: true };

    }
    catch (error) {
        console.log("Error To Save the data in Excel Sheet", error);
        return { success: false };
    }

}


exports.studentForm = async (req, res) => {
    const { name, email, phone, course, joiningTime, message } = req.body;

    //data validation
    if (!name || !email || !phone || !course ) {
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

            const response = await saveDataToExcel(name, email, phone, course, joiningTime, message);

        console.log("response of excel", response.success);

        return res.status(200).json({ success: response.success, message: "Excel data response" });
    }
    catch (error) {
        console.log("error", error);
        return errorResponse(res, "data not submited please verify the data");
    }
}


