
// required dependency
const express = require("express");
const router = express.Router();


// importing required controler


// auth controller
const {sendOtp, signup, login, logout, } = require('../controller/Auth');



// bill controller
const {addDailyExp, addFixedBill,fixedBillPay,getFixedBill} = require('../controller/BillController');



// user controller
const {getUserDetails } = require('../controller/UserController');





// auth routing
router.post('/sendOtp' , sendOtp);
router.post('/signup' , signup);
router.post('/login' , login);
router.get('/logout' , logout);



// user routing
router.get('/getUserDetails/:userId', getUserDetails);



// bill routing
router.post('/addDailyExp', addDailyExp);
router.get('/getfixedbill/:userId',getFixedBill);
router.post('/payfixedbill',fixedBillPay);
router.post('/addfixedbill',addFixedBill);



// other routing




// export route
module.exports = router; 
