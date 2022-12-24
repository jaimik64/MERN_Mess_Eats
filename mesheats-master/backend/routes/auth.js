const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const { check } = require('express-validator');
const { signup, signin, signout, test, forgetPassword, udpatePassword } = require('../controllers/auth');


router.post('/signup', [
    check('email').isEmail().withMessage('Email Required'),
    check('password').isLength({ min: 8, max: 16 }).withMessage('Password should be atleast 8 to 16 character')
], signup);

router.post('/signin', [
    check('email').isEmail().withMessage('Email is Required'),
    check('password').isLength({ min: 8, max: 16 }).withMessage('Password required')
], signin);


router.get('/signout', signout);

router.get('/forgetpassword', forgetPassword);

router.get('/test', test)

module.exports = router;