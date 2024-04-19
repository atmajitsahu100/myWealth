const mongoose = require('mongoose');

const FixedBillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name : {
        type : String,
        required : true,
        trim : true,
    },
    cost:{
        type : Number,
        default : 0,
    },
    lastPayment: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model("FixedBill", FixedBillSchema);
