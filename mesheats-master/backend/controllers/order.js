const Order = require('../models/Order');
const Razorpay = require('razorpay');
const mongoose = require('mongoose')

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id).exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(order)
        req.order = order
        next();
    })
}

exports.getAllOrders = (req, res) => {

    Order.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "UserData"
            }
        },
        {
            $lookup: {
                from: "meshusers",
                localField: "meshid",
                foreignField: "_id",
                as: "MeshData"
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "addressid",
                foreignField: "_id",
                as: "Address"
            }
        },
        {
            $lookup: {
                from: "days",
                localField: "dishes.dishId",
                foreignField: "_id",
                as: "DishDetails"
            }
        }
    ]).then((data) => {
        return res.json(data)
    })
}

exports.getOrderDetailsByUserId = (req, res) => {


    Order.aggregate([
        { $match: { userid: mongoose.Types.ObjectId(req.body.id) } },
        {
            $lookup: {
                from: "meshusers",
                localField: "meshid",
                foreignField: "_id",
                as: "MeshData"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "UserData"
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "addressid",
                foreignField: "_id",
                as: "Address"
            }
        },
        {
            $lookup: {
                from: "days",
                localField: "dishes.dishId",
                foreignField: "_id",
                as: "DishDetails"
            }
        }
    ]).then(data => {
        return res.json(data)
    })
}

exports.getOrdersByMessId = (req, res) => {
    Order.aggregate([
        { $match: { meshid: mongoose.Types.ObjectId(req.body.messId) } },
        {
            $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "addressid",
                foreignField: "_id",
                as: "Address"
            }
        },
        {
            $lookup: {
                from: "days",
                localField: "dishes.dishId",
                foreignField: "_id",
                as: "dishDetails"
            }
        }
    ]).then(data => {
        return res.json(data)
    })
}


exports.getUnSettledOrders = (req, res) => {
    Order.aggregate([
        { $match: { "settled": { $eq: false } } },
        {
            $lookup: {
                from: 'meshusers',
                localField: "meshid",
                foreignField: '_id',
                as: "meshData"
            }
        },
        {
            $project: {
                name: { $first: "$meshData.name" },
                email: { $first: "$meshData.email" },
                mobile: { $first: "$meshData.mobile" },
                location: { $first: "$meshData.location" },
                city: { $first: "$meshData.city" },
                meshid: "$meshid",
                totalbill: "$totalbill"
            }
        },
        {
            $group: {
                _id: "$meshid",
                meshUsers: { $push: "$$ROOT" },
                total: { $sum: "$totalbill" }
            }
        }
    ]).then(data => {
        return res.json(data)
    })
}

exports.settleOrders = (req, res) => {
    Order.updateMany(
        { settled: { $eq: false } },
        { $set: { "settled": true } }
    ).exec((err, order) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(order)
    })
}

exports.createOrder = (req, res) => {
    const order = new Order(req.body);

    order.save((err, order) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(order);
    })
}


exports.razorPayCreateOrder = (req, res) => {
    var instance = new Razorpay({
        key_id: process.env.RAZOR_PAY_KEY_ID,
        key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });

    instance.orders.create({
        amount: req.body.totalbill,
        currency: "INR"
    }, (error, response) => {
        if (error) {
            // handle error
            console.log("ERROR : " + JSON.stringify(error))
            return res.status(404).json(error)
        } else {
            console.log("RES : " + JSON.stringify(response))
            // handle success
            return res.json(response)
        }
    })
}

exports.ordersByUserId = (req, res) => {
    Order.find({ userid: req.profile._id })
        .exec((err, order) => {
            if (err) {
                return res.status(400).json(err);
            }
            res.json(order);
        })
}

exports.updateOrder = (req, res) => {
    console.log(req.order._id)
    Order.findByIdAndUpdate(
        { _id: req.order._id },
        { $set: req.body }
    )
        .exec((err, order) => {
            if (err) {
                return res.status(400).json(err);
            }
            res.json(order)
        })
}
