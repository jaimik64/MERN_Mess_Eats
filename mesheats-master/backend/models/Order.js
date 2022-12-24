const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userid: {
        type: mongoose.ObjectId,
        required: true,
        ref: "User"
    },
    meshid: {
        type: mongoose.ObjectId,
        required: true,
        ref: "MeshUser"
    },
    addressid: {
        type: mongoose.ObjectId,
        required: true,
        ref: "Address"
    },
    payment: {
        type: String
    },
    totalbill: {
        type: Number
    },
    dishes: [
        {
            qty: {
                type: Number
            },
            dishId: {
                type: mongoose.ObjectId,
                ref: "Day"
            }
        }
    ],
    status: {
        type: String
    },
    suggestion: {
        type: String
    },
    feedback: {
        type: String
    },
    settled: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema);