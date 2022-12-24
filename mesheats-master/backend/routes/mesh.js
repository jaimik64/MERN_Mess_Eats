var express = require('express');
var router = express.Router();

const { addDishInDay, updateDish, removeDish, getDishesByMeshId, getMashWiseDishes } = require('../controllers/day');
const { getUserById, getItemById, updateProfile, getMeshDetailsById, getMeshes } = require('../controllers/MeshAuth');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { viewMeshSubscriptions } = require('../controllers/subscription');
const { getOrdersByMessId, updateOrder, getOrderById } = require('../controllers/order')

router.param('userId', getUserById); // Mesh Id
router.param('itemId', getItemById); // Dish Id
router.param('orderId', getOrderById)

// Add dish on particular day
router.post('/addDish/:userId', isSignedIn, isAuthenticated, addDishInDay);

router.put('/updateDish/:userId/:itemId', isSignedIn, isAuthenticated, updateDish);

router.delete('/removeDish/:userId/:itemId', isSignedIn, isAuthenticated, removeDish);

router.get('/dishes/:userId', isSignedIn, isAuthenticated, getDishesByMeshId);

router.get('/dishes/', isSignedIn, isAuthenticated, isAdmin, getMashWiseDishes);

router.get('/subscription/:userId', isSignedIn, isAuthenticated, viewMeshSubscriptions);

router.get('/user_details/:userId', isSignedIn, isAuthenticated, getMeshDetailsById)

router.post('/orders/:userId', isSignedIn, isAuthenticated, getOrdersByMessId)

// Profile
router.put('/update/:userId', isSignedIn, isAuthenticated, updateProfile);

router.put('/updateOrder/:userId/:orderId', isSignedIn, isAuthenticated, updateOrder)

router.get('/subscriptions/:userId', isSignedIn, isAuthenticated, viewMeshSubscriptions)

module.exports = router;