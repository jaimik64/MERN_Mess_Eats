const User = require('../models/User');

exports.updateRole = (req, res) => {
    const { _id } = req.refUser;

    User.findByIdAndUpdate(
        { _id },
        { $set: req.body }
    ).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "User was not found"
            })
        }

        return res.json({
            msg: "User Details Updated"
        })
    })
}