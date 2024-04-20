const mongoose = require('mongoose');

const dailyExpenseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    cost : {
        type : Number,
        default : 0,
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("DailyExpense", dailyExpenseSchema);
