const multer = require('multer');
const path = require('path');
const {validationErrorWithData } = require("../helper/apiResponse")

//set storage options

const storage = multer.diskStorage({
  
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../public'))
    },
    filename:(req,file,cb)=>{
        // if (!req.file) {
        //     return validationErrorWithData(res, "Image file is required");
        // }
        cb(null,Date.now()+file.originalname);
    }
});

const upload = multer({storage});

module.exports = upload;

