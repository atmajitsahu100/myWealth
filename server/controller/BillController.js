
const User = require('../models/UserModel')
const FixedBill = require('../models/FixedBillModel')
const DailyExpense = require('../models/DailyExpModel')
const Investment = require('../models/InvestmentModel') 

exports.addDailyExp = async (req, res) => {
    try {
        const { name, cost, userId } = req.body;

        // Create a new daily expense
        const newDailyExpense = await DailyExpense.create({
            name : name,
            cost: cost,
        });

        // Update the user model with the created daily expense
        await User.findByIdAndUpdate(userId, {
            $push: { dailyExps: newDailyExpense._id },
            $inc: { balance: -cost }
        });

        res.status(200).json({
            success: true,
            message: 'Daily expense added successfully.',
            newDailyExpense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while adding the daily expense.'
        });
    }
};