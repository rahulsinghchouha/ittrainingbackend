const mongoose = require("mongoose")

const ourPartnersSchema = new mongoose.Schema({
    img: 
        {
        type: String,
        required: true
    },

});

const ourPartners = mongoose.model("ourPartners", ourPartnersSchema);

module.exports = ourPartners;
