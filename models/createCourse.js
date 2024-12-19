const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true
    },
    courseName: {
        type: String,
        require: true
    },
    overview: {
        type: String,
        require: true
    },
    keyAreas: [
        {
            heading: {
                type: String,
                require: true,
            },
            details: {
                type: String,
                require: true
            }
        }
    ],
    toolsInHand: {
        type: [String],
        require: true,
    },
    benefits: {
        type: [String],
        require: true,
    },
    courseCurriculum: [
        {
            heading: {
                type: String,
                require: true,
            },
            details: {
                type: [String],
                require: true,
            },
        }
    ],
    keyHighLights: {
        type: [String],
        require: true,
    },
    jobRoles: {
        type: [String],
        require: true
    },
    fAQ: [
        {
            heading: {
                type: String,
                require: true,
            },
            details: {
                type: [String],
                require: true,
            },
    }
],
}, { timestamps: true })

const course = mongoose.model("course", courseSchema);

module.exports = course;



