const mongoose = require('mongoose');

const FixedBill = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    cost : {
        type : Number,
        default : 0,
    },
    lastPayment : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("FixedBill", FixedBill);
