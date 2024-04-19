
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
    },
    gender : {
        type : String,
    },
    image : {
        type : String,
    },
    contactNo : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
    },
    token : {
        type : String,
    },
    balance : {
        type : Number,
        required : true,
        default : 0,
    },
    fixedBillamt:
        {
            type:Number,
            default: 0,
        }
    ,
    fixedBills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FixedBill'
    }],
    dailyExps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DailyExpense'
    }],
    investments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment'
    }]
})

module.exports = mongoose.model("User" , userSchema);