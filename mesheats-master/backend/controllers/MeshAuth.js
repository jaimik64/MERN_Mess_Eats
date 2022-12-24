const MeshUser = require('../models/MeshUser');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
var { expressjwt: ejwt } = require('express-jwt');
const Day = require('../models/DaySchema');
const { signUpMail } = require('../mail/userSignUp');

exports.getUserById = (req, res, next, id) => {
    MeshUser.findById(id).exec((err, meshuser) => {
        if (err || !meshuser) {
            return res.status(400).json({
                err
            })
        }
        req.profile = meshuser;
        next();
    })
}

exports.getMeshId = (req, res, next, id) => {

    MeshUser.findById(id).exec((err, meshuser) => {

        if (err || !meshuser) {
            return res.status(400).json({
                err
            })
        }
        req.mesh = meshuser;
        next();
    })
}

exports.getItemById = (req, res, next, id) => {

    Day.findById(id)
        .exec((err, item) => {
            if (err) {
                return res.status(400).json({
                    err
                })
            }

            console.log(item);

            req.item = item;
            next();
        })
}

exports.signUp = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({
            param: erros.array()[0].param,
            error: errors.array()[0].msg
        })
    }

    const meshUser = new MeshUser(req.body);

    meshUser.save((err, meshuser) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        signUpMail(meshuser.email, meshuser.name);

        res.json({
            name: meshuser.name,
            email: meshuser.email,
            id: meshuser._id
        })
    })
}

exports.signIn = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            param: errors.array()[0].param,
            error: erros.array()[0].msg
        })
    }

    MeshUser.findOne({ email: email }, (err, user) => {

        if (err || !user) {
            return res.status(401).json({ err, user: user })
        }

        if (!user.authenticate(password)) {
            return res.status(402).json({ err: "Email-Id and Password Do not match" })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        const { _id, name, email, mobile } = user;

        console.log("HERe")

        return res.json({
            token, user: { _id, name, email, mobile }
        })
    })
}

exports.signOut = (req, res) => {
    res.clearCookie('token');

    res.json({
        msg: "User Signed Out Successfully"
    })
}

exports.updateProfile = (req, res) => {

    MeshUser.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body }
    ).exec((err, updatedDetails) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        res.json(updatedDetails);
    })
}

exports.getAllMeshDetails = (req, res) => {
    MeshUser.find().exec((err, meshes) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        res.json(meshes);
    })
}

exports.removeMeshUser = (req, res) => {

    MeshUser.findByIdAndRemove({ _id: req.mesh._id }).exec((err, mesh) => {
        if (err || !mesh) {
            return res.status(400).json({
                msg: "User not found",
                err
            })
        }

        return res.json({
            msg: "Mesh has been removed",
            mesh: {
                mesh
            }
        });
    })
}

exports.getMeshDetailsById = (req, res) => {
    MeshUser.findById(req.profile.id)
        .exec((err, mesh) => {
            if (err || !mesh) {
                return res.status(400).json({
                    msg: "User Not Found",
                    err
                })
            }

            return res.json(mesh)
        })
}

exports.getMeshDetail = (req, res) => {
    MeshUser.findById(req.mesh.id)
        .exec((err, mesh) => {
            if (err || !mesh) {
                return res.status(400).json({
                    msg: "User not found",
                    err
                })
            }
            return res.json(mesh)
        })
}


exports.getMeshes = (req, res) => {

    MeshUser.find()
        .exec((err, mesh) => {
            if (err || !mesh) {
                return res.status(400).json({
                    err
                })
            }

            return res.json(mesh)
        })
}

