var express = require('express');
var router = express.Router();
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { addSubscription, viewUserSubscription } = require('../controllers/subscription');
const { getUserById, updateProfile, getUserDetails } = require('../controllers/user');
const { getMeshes, getMeshId, getMeshDetail } = require('../controllers/MeshAuth')
const { addAddress, updateAddress, getAddressId, deleteAddress, getAllAddresses, getAllAddressByUserId } = require('../controllers/userAddress');
const { getDishesByMeshIdToUser, getSubscriptionsByMeshIdToUser } = require('../controllers/day');

// Params
router.param("userId", getUserById);
router.param("addressId", getAddressId)
router.param("meshId", getMeshId)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// User Address Routes 
router.post('/addAddress/:userId', isSignedIn, isAuthenticated, addAddress);

router.put('/updateAddress/:userId/:addressId', isSignedIn, isAuthenticated, updateAddress);

router.delete('/removeAddress/:userId/:addressId', isSignedIn, isAuthenticated, deleteAddress);

router.put('/updateProfile/:userId', isSignedIn, isAuthenticated, updateProfile);

router.get('/addresses/:userId', isSignedIn, isAuthenticated, getAllAddressByUserId);


router.get('/getprofile/:userId', isSignedIn, isAuthenticated, getUserDetails)

router.get('/meshes/:userId', isSignedIn, isAuthenticated, getMeshes)

router.get('/mesh/dishes/:userId/:meshId', isSignedIn, isAuthenticated, getDishesByMeshIdToUser)

router.get('/mesh/detail/:userId/:meshId', isSignedIn, isAuthenticated, getMeshDetail)

router.get('/meshes', getMeshes)

router.post('/subscriptions/:userId/:meshId', isSignedIn, isAuthenticated, getSubscriptionsByMeshIdToUser)

router.post('/buy/subscription/:userId', isSignedIn, isAuthenticated, addSubscription)

router.post('/subscription/:userId', isSignedIn, isAuthenticated, viewUserSubscription);

module.exports = router;