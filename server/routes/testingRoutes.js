
// required dependency
const express = require("express");
const router = express.Router();


// importing required controler


// auth controller
const {sendOtp, signup, login, logout, } = require('../controller/Auth');



// bill controller
const {addFixedBill,fixedBillPay,getFixedBill} = require('../controller/BillController');



// auth routing
router.post('/sendOtp' , sendOtp);
router.post('/signup' , signup);
router.post('/login' , login);
router.get('/logout' , logout);
router.get('/getfixedbill/:userId',getFixedBill);
router.post('/payfixedbill',fixedBillPay);
router.post('/addfixedbill',addFixedBill);



// other routing




// export route
module.exports = router; 
