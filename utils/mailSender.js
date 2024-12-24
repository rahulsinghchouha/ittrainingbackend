const nodemailer = require("nodemailer");
const { errorResponse } = require("../helper/apiResponse");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
        throw new Error("Missing required environment variables: MAIL_HOST, MAIL_USER, or MAIL_PASS");
    }
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
       

     let info =   await transporter.sendMail({
            from : `IT Training Indore <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
    return info;

    }
    catch (error) {

        console.log( "mail sender error",error);

    }

}

module.exports = mailSender;




