const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const { check } = require('express-validator');
const { signUp, signIn, signOut } = require('../controllers/MeshAuth');

router.post('/signup', [
    check('email').isEmail().withMessage('Email Required'),
    check('password').isLength({ min: 8, max: 16 }).withMessage('Password should be atleast 8 to 16 characters'),
    check('mobile').isNumeric().isMobilePhone().withMessage('Mobile Number must be 10 digits only')
], signUp);

router.post('/signin', [
    check('email').isEmail().withMessage('Email Required'),
    check('password').isLength({ min: 8, max: 16 }).withMessage('Password should be atleast 8 to 16 characters')
], signIn);

router.get('/signout', signOut);

module.exports = router;