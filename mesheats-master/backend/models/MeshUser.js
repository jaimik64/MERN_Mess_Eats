const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid')
const { ObjectId } = mongoose.Schema;

//FIXME: Fix the References in Dishes and Day Schema
// const Dishes = new mongoose.Schema({
//     name: {
//         type: String,
//         maxLength: 32,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     rate: {
//         type: Number,
//         required: true,
//         default: 0
//     }
// });


const MeshUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxLength: 10,
        minLength: 10
    },
    location: {
        type: String,
        required: true,
        maxLength: 512
    },
    city: {
        type: String,
        required: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    delivery: {
        type: Boolean,
        required: true,
        default: false
    },
    overAllFeedback: {
        type: Number,
        default: 0
    }
},
    { timestamps: true });


MeshUserSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password;
    });


MeshUserSchema.methods = {

    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model('MeshUser', MeshUserSchema)