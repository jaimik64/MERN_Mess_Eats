const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const SubscriptionSchema = new mongoose.Schema({
    fees: {
        type: Number,
        default: 0
    },
    toDate: {
        type: Date
    },
    fromDate: {
        type: Date
    },
    createdByWhom: {
        type: String,
        default: "User"
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    meshId: {
        type: ObjectId,
        ref: "MeshUser"
    },
    addressId: {
        type: ObjectId,
        ref: "Address"
    },
    dishId: {
        type: ObjectId,
        ref: "Day"
    },
    paymentId: {
        type: String
    },
    settled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Subscription', SubscriptionSchema);