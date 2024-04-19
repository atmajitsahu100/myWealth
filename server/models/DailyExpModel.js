const mongoose = require('mongoose');

const dailyExpenseSchema = new mongoose.Schema({
    // Define properties of expense
});

module.exports = mongoose.model("DailyExpense", dailyExpenseSchema);
