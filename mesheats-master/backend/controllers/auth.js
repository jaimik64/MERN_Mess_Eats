const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
var { expressjwt: ejwt } = require('express-jwt');
const { signUpMail } = require('../mail/userSignUp');
const { orderMail } = require('../mail/orderMail');


exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            param: errors.array()[0].param,
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                err: "Not able to signup, Please check details"
            })
        }

        signUpMail(user.email, user.name);

        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

exports.signin = (req, res) => {

    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            param: errors.array()[0].param,
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'User Not Found'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({
                err: 'EmailId and Password do not match'
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        const { _id, name, email, role } = user;

        return res.json({
            token, user: { _id, name, email, role }
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token');

    res.json({
        msg: "User Sign out Successfully"
    })
}

exports.forgetPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email })
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User with this email does not exists."
                })
            }
            let salt = user.salt;
            let givenPassObj = sha256(user.encry_password, salt)

            return res.json(user)
        })
}

// Middle wares
exports.isSignedIn = ejwt({
    secret: process.env.SECRET || 'mesheats',
    userProperty: "auth",
    algorithms: ["HS256"]
})

exports.isAuthenticated = (req, res, next) => {
    let check = req.profile && req.auth && req.profile._id.toString() === req.auth._id;

    if (!check) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

exports.test = (req, res) => {
    orderMail("jaimikchauhan10@gmail.com", "Jaimik Chauhan", "K Canteen", "jaimikc@gmail.com", 1000, "98327137")
}