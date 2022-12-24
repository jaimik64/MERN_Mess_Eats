const Day = require('../models/DaySchema');
const Mash = require('../models/MeshUser')

exports.addDishInDay = (req, res) => {

    const dayData = new Day(req.body);

    dayData.save((err, day) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                err
            })
        }
        res.json({
            day: day.dname,
            rate: day.rate,
            isLunch: day.isLunch,
            description: day.description,
            meshUser: day.meshUser
        })
    })
}

exports.updateDish = (req, res) => {
    console.log(req.body)
    Day.findByIdAndUpdate(
        { _id: req.item._id },
        { $set: req.body },
        { new: true, userFindAndModify: false }
    ).exec((err, updatedDish) => {
        console.log("ERR : " + err)
        console.log("UPDATED DISH : " + updatedDish)
        if (err || !updatedDish) {
            return res.status(400).json({
                error: "Not Authorized to update this information"
            })
        }
        res.json(updatedDish)
    })
}

exports.removeDish = (req, res) => {
    const id = req.item._id;

    Day.findByIdAndRemove(id)
        .exec((err, deletedDish) => {
            if (err) {
                return res.status(400).json({
                    err
                })
            }

            res.json({
                deletedDish
            })
        })
}

exports.getDishesByMeshId = (req, res) => {
    Day.find({ meshuser: req.profile._id })
        .exec((err, dishes) => {
            if (err) {
                return res.status(400).json({
                    err
                })
            }
            res.json(dishes)
        })
}

exports.getDishesByMeshIdToUser = (req, res) => {
    Day.find({
        $and: [
            { meshuser: req.mesh._id },
            { dayname: { $ne: "Subscription" } }
        ]
    })
        .exec((err, dishes) => {
            if (err) {
                return res.status(400).json(err)
            }
            res.json(dishes)
        })
}


exports.getSubscriptionsByMeshIdToUser = (req, res) => {
    Day.find({
        $and: [
            { meshuser: req.mesh._id },
            { dayname: { $eq: "Subscription" } }
        ]
    })
        .exec((err, dishes) => {
            console.log(err)
            if (err) {
                return res.status(400).json(err)
            }
            return res.json(dishes)
        })
}

exports.getAllDishes = (req, res) => {
    Day.aggregate([
        // {
        //     $lookup: {
        //         from: "meshusers",
        //         localField: "meshuser",
        //         foreignField: "_id",
        //         as: "meshUserDatw"
        //     }
        // },
        {
            $lookup: {
                from: "meshusers",
                let: { id: "$meshuser" },
                pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$id"] } } }, {
                    $project: {
                        name: 1,
                        mobile: 1,
                        email: 1,
                        location: 1,
                        city: 1
                    }
                }],
                as: "meshUser"
            }
        }
    ]).then((data) => {
        return res.json(data)
    })
}

exports.getMashWiseDishes = async (req, res) => {
    const getDishes = await Mash.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: "days",
                let: { meshId: "$_id" },
                pipeline: [{ $match: { $expr: { $and: [{ $eq: ["$meshuser", "$$meshId"] }, { $eq: ["$isLunch", 0] }] } } }, {
                    $project: {
                        __v: 0,
                        _id: 0
                    }
                }],
                as: "dishes"
            }
        }, {
            $project: {
                __v: 0,
                _id: 0
            }
        },
        {
            $sort: { updatedAt: 1 }
        }
    ])

    return res.json({ data: getDishes })
}
