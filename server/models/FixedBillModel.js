const mongoose = require('mongoose');

const FixedBillSchema = new mongoose.Schema({
    // Define properties of bill
});

module.exports = mongoose.model("FixedBill", FixedBillSchema);
