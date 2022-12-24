const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const addressSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 32
    },
    mobile: {
        type: String,
        maxLength: 10,
        minLength: 10
    },
    pincode: {
        type: Number,
        required: true,
        maxLength: 6,
        minLength: 6
    },
    locality: {
        type: String,
        length: 64
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    landmark: {
        type: String
    },
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model('Address', addressSchema);