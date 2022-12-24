const Subscription = require('../models/Subscription');

exports.addSubscription = (req, res) => {
    const subscription = new Subscription(req.body);

    subscription.save((err, sub) => {
        if (err) {
            return res.status(400).json({
                err,
                msg: "Error Occured"
            })
        }

        return res.json({
            msg: "subscription Added",
            sub
        });
    })
}

exports.updatSubscription = (req, res) => {
    const { subscriptionId } = req.body;

    Subscription.findByIdAndUpdate({ _id: subscriptionId })
        .exec((err, sub) => {
            if (err) {
                return res.status(400).json(err)
            }
            return res.json({
                msg: "Subscription Updated",
                sub
            })
        })
}

//FIXME: Think about this
exports.removeSubscriptions = (req, res) => {

    const { id } = req.body;

    Subscription.findByIdAndRemove({ id })
        .exec((err, sub) => {
            if (err) {
                return res.status(400).json(err)
            }

            return res.json({
                msg: "Subscription Removed",
                sub
            });
        })
}


exports.allSubscriptions = (req, res) => {

    Subscription.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $lookup: {
                from: "meshusers",
                localField: "meshId",
                foreignField: "_id",
                as: "meshData"
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "addressId",
                foreignField: "_id",
                as: "addressData"
            }
        },
        {
            $lookup: {
                from: "days",
                localField: "dishId",
                foreignField: "_id",
                as: "dishData"
            }
        }
    ]).then(data => {
        return res.json(data)
    })

    // Subscription.find().exec((err, subs) => {
    //     if (err) {
    //         return res.status(400).json({
    //             err
    //         })
    //     }

    //     return res.json(subs);
    // })
}

exports.viewMeshSubscriptions = (req, res) => {
    console.log(req.profile._id)
    Subscription.aggregate([
        { $match: { meshId: req.profile._id } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "addressId",
                foreignField: "_id",
                as: "addressData"
            }
        },
        {
            $lookup: {
                from: "days",
                localField: "dishId",
                foreignField: "_id",
                as: "dishData"
            }
        }
    ]).then(data => {
        return res.json(data)
    })
}

exports.viewUserSubscription = (req, res) => {
    // console.log(req.profile)
    Subscription.aggregate([
        { $match: { userId: req.profile._id } },
        {
            $lookup: {
                from: "meshusers",
                localField: "meshId",
                foreignField: "_id",
                as: "meshData"
            }
        },
        {
            $lookup: {
                from: "days",
                localField: "dishId",
                foreignField: "_id",
                as: "dishData"
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "addressId",
                foreignField: "_id",
                as: "addressData"
            }
        }
    ]).then(data => {
        return res.json(data)
    })
}


exports.getUnSettledSubscriptions = (req, res) => {
    Subscription.aggregate([
        { $match: { "settled": { $eq: false } } },
        {
            $lookup: {
                from: 'meshusers',
                localField: 'meshId',
                foreignField: '_id',
                as: 'meshData'
            }
        },
        {
            $project: {
                name: { $first: "$meshData.name" },
                email: { $first: "$meshData.email" },
                mobile: { $first: "$meshData.mobile" },
                location: { $first: "$meshData.location" },
                city: { $first: "$meshData.city" },
                fees: "$fees",
                meshid: "$meshId"
            }
        },
        {
            $group: {
                _id: "$meshid",
                meshUsers: { $push: "$$ROOT" },
                total: { $sum: "$fees" }
            }
        }
    ]).then(data => {
        return res.json(data)
    })
}

exports.settleSubscriptions = (req, res) => {

    Subscription.updateMany(
        { settled: { $eq: false } },
        { $set: { "settled": true } }
    ).exec((err, subscription) => {
        if (err)
            return res.status(400).json(err)
        res.json(subscription)
    })
}