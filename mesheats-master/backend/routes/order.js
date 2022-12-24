var express = require('express');
var router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getAllOrders, getOrderById, getOrderDetailsByUserId, ordersByUserId, createOrder, razorPayCreateOrder, updateOrder } = require('../controllers/order');
const { createDetails, validateRpPayment } = require('../controllers/razorPay');
const { getUserById } = require("../controllers/user")


router.param("userId", getUserById)
router.param("orderId", getOrderById)

router.get('/allOrders/:userId', isSignedIn, isAuthenticated, isAdmin, getAllOrders);

router.post('/orderDetails/:userId', isSignedIn, isAuthenticated, getOrderDetailsByUserId);

router.get('/getOrders/:userId', isSignedIn, isAuthenticated, ordersByUserId)

router.post('/createOrder/:userId', isSignedIn, isAuthenticated, createOrder)

router.post('/createRPOrder/:userId', isSignedIn, isAuthenticated, razorPayCreateOrder)

router.post('/storeRPOrderDetails/:userId', isSignedIn, isAuthenticated, createDetails)

router.post('/validateSignature/:userId', isSignedIn, isAuthenticated, validateRpPayment)


module.exports = router;