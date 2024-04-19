

const User = require('../models/UserModel')
const FixedBill = require('../models/FixedBillModel')
const DailyExpense = require('../models/DailyExpModel')
const Investment = require('../models/InvestmentModel')

exports.getUserDetails = async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId)
                                .select("-password")
                                .populate('fixedBills')
                                .populate('dailyExps')
                                .populate('investments');
                                
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "user not found" 
        });
      }
      res.json({ 
        success: true, 
        user 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: "something went wrong while fetching user profile detail" 
      });
    }
  };