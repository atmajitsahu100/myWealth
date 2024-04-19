const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
});

module.exports = mongoose.model("Investment", investmentSchema);
