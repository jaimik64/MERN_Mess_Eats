const User = require('../models/User');

exports.getUserById = (req, res, next, id) => {
    // console.log("Function Called");
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No User was found"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getRefUserById = (req, res, next, id) => {

    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No User Was Found"
            })
        }
        req.refUser = user;
        next();
    })
}


exports.updateProfile = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body }
    ).exec((err, updatedProfile) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        res.json(updatedProfile);
    })
}

exports.getAllUsers = (req, res) => {
    User.find().exec((err, user) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        res.json(user)
    })
}

exports.removeUser = (req, res) => {

    User.findByIdAndRemove({ _id: req.refUser._id })
        .exec((err, deletedUser) => {
            if (err) {
                return res.status(400).json({
                    err
                })
            }
            return res.json(
                {
                    msg: "Following User Removed",
                    user: { deletedUser }
                }
            );
        })
}

exports.getUserDetails = (req, res) => {
    User.findById(req.profile._id)
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "No User Was Found"
                })
            }

            return res.json(user)
        })
}

exports.user = (req, res) => {

}