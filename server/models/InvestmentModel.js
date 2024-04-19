const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    // Define properties of investment
});

module.exports = mongoose.model("Investment", investmentSchema);
