const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { validationErrorWithData } = require("../helper/apiResponse")

//set storage options

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public'))
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + file.originalname);

    }
});

// for delete the image 
// This function checks if the file exists asynchronously and deletes it if it does
const deleteImage = async (imagePath,imageName) => {
    try {
        // Check if the file exists asynchronously using fs.promises.access
        await fs.promises.access(imagePath, fs.constants.F_OK);  // Check if file exists

        // File exists, so proceed to delete it
        await fs.promises.unlink(imagePath);
        console.log(`Image deleted: ${imageName}`);
    } catch (err) {
        // If file doesn't exist or any other error happens, log the error
        console.error(`Error deleting image: ${imageName}`, err);
    }
};

const upload = multer({ storage });

module.exports = {upload,deleteImage};

