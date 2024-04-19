const FixedBill = require("../models/FixedBillModel");
const DailyExp = require("../models/DailyExpModel");
const User = require("../models/UserModel");

exports.addFixedBill = async(req,res)=>{
    try{
        const {userId,name,cost,duedate}=req.body;
        
        const newFixedBill = new FixedBill({
            userId:userId,
            name: name,
            cost: cost,
        });
        const savedFixedBill = await newFixedBill.save();

        const user = await User.findById(userId);
        user.fixedBillamt += cost;
        await user.save();
        res.status(201).json(savedFixedBill);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "error while adding fixed bill" });
    }
}

exports.fixedBillPay=async(req,res)=>{
    try{
        const { userId } = req.body;

        
       await FixedBill.updateMany({ userId: userId }, { $inc: { lastPayment: 30 * 24 * 60 * 60 * 1000 } });
       const user = await User.findById(userId);
       user.balance-=user.fixedBillamt;
    
       await user.save();
        res.status(200).json({ message: "Payment made successfully" });

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
