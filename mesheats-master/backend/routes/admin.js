var express = require('express');
var router = express.Router();

const { updateRole } = require('../controllers/admin')
const { getAllDishes } = require('../controllers/day');
const { getAllUsers, getUserById, removeUser, getRefUserById } = require('../controllers/user');
const { getAllAddresses } = require('../controllers/userAddress');
const { getAllMeshDetails, getMeshId, removeMeshUser } = require('../controllers/MeshAuth');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { allSubscriptions } = require('../controllers/subscription');
const { getUnSettledOrders, settleOrders } = require('../controllers/order');
const { getUnSettledSubscriptions, settleSubscriptions } = require('../controllers/subscription')


router.param('userId', getUserById);
router.param('refUserId', getRefUserById);
router.param('refMeshId', getMeshId);

router.get('/allDishes/:userId', isSignedIn, isAuthenticated, isAdmin, getAllDishes);

router.get('/getAllUsers/:userId', isSignedIn, isAuthenticated, isAdmin, getAllUsers);

router.get('/allAddresses/:userId', isSignedIn, isAuthenticated, isAdmin, getAllAddresses);

router.get('/mesh/:userId', isSignedIn, isAuthenticated, isAdmin, getAllMeshDetails);

router.put('/updateRole/:refUserId/:userId', isSignedIn, isAuthenticated, isAdmin, updateRole);

router.delete('/removeUser/:refUserId/:userId', isSignedIn, isAuthenticated, isAdmin, removeUser);

router.get('/subscription/:userId', isSignedIn, isAuthenticated, isAdmin, allSubscriptions);

router.get('/unsettledOrders/:userId', isSignedIn, isAuthenticated, isAdmin, getUnSettledOrders)

router.get('/unsettledSubscriptions/:userId', isSignedIn, isAuthenticated, isAdmin, getUnSettledSubscriptions)

router.post('/settleSubscriptions/:userId', isSignedIn, isAuthenticated, settleSubscriptions)

router.post('/settleOrders/:userId', isSignedIn, isAuthenticated, settleOrders)
// FIXME: Fix this 
router.delete('/removeMesh/:refMeshId/:userId', isSignedIn, isAuthenticated, isAdmin, removeMeshUser);

module.exports = router;