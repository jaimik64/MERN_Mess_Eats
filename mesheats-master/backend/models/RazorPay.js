const mongoose = require('mongoose');

const RazorPaySchema = mongoose.Schema({
    paymentid: {
        type: String,
        required: true
    },
    orderid: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("RazorPayDetail", RazorPaySchema);