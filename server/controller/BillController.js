
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
}


exports.addFixedBill = async(req,res)=>{
    try{
        const {userId,name,cost,duedate}=req.body;
        
        const newFixedBill = new FixedBill({
            name: name,
            cost: cost,
        });
        await newFixedBill.save();
        await User.findByIdAndUpdate(userId, {
            $push: { fixedBills: newFixedBill._id },
            $inc: { fixedBillamt: cost }
        });
        res.status(200).json({ success: true,
            message: 'fixed bill added successfully.',
            newFixedBill
    });
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while adding the fixed bill.'
        });
    }
}

exports.fixedBillPay=async(req,res)=>{
    const { userId } = req.body;
    try{
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retrieve all fixed pay bills associated with the user
        const fixedBills = await FixedBill.find({ _id: { $in: user.fixedBills } });

        // Update the last payment date of each fixed pay bill
        const updatePromises = fixedBills.map(async (fixedBill) => {
            fixedBill.lastPayment.setDate(fixedBill.lastPayment.getDate() + 30);
            await fixedBill.save();
        });

        // Wait for all fixed pay bills to be updated
        await Promise.all(updatePromises);

        res.status(200).json({ message: 'All fixed pay bills updated successfully' });

    }
    catch (error){
       // console.error(error);
        res.status(500).json({ message: "fixed bill pay error" });
    }
}
exports.getFixedBill=async(req,res)=>{
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('fixedBills');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.fixedBills);
    } catch (error) {
        console.error('Error getting fixed pay bills:', error);
        res.status(500).json({ message: 'Error getting fixed pay bills' });
    }
}
