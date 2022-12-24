const Address = require('../models/AddressSchema');

exports.getAddressId = (req, res, next, id) => {
    Address.findById(id)
        .exec((err, address) => {
            if (err) {
                return res.status(400).json({
                    error: "Address Not Found"
                })
            }
            req.address = address;
            console.log(req.address);
            next();
        })
}


exports.addAddress = (req, res) => {
    const address = new Address(req.body);

    address.save((err, address) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        res.json({
            id: address._id,
            user: address.user
        })
    })
}

exports.updateAddress = (req, res) => {
    Address.findByIdAndUpdate(
        { _id: req.address._id },
        { $set: req.body },
        { new: true, userFindAndModify: false }
    ).exec((err, updatedAddress) => {
        if (err || !updatedAddress) {
            return res.status(400).json({
                error: "Not Authorised to update this information"
            })
        }

        res.json(updatedAddress);
    })
}

exports.deleteAddress = (req, res) => {

    const id = req.address._id;

    Address.findByIdAndRemove(id, (err, deletedData) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        res.json(deletedData);
    })
}

exports.getAllAddresses = (req, res) => {
    Address.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetail"
            }
        }
    ]).then(data => {
        return res.json(data)
    })
}

exports.getAllAddressByUserId = (req, res) => {
    Address.find({ user: req.profile._id })
        .exec((err, addresses) => {
            if (err) {
                return res.status(400).json({
                    err
                })
            }
            res.json(addresses);
        })
}