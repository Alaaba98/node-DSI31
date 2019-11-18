const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var md5 = require('md5');
var Cryptr = require('cryptr');
cryptr = new Cryptr('devnami');

const readChunk = require('read-chunk');
const imageType = require('image-type');
const multer = require('multer');
const path = require('path');

const saltRounds = 4;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const salt = bcrypt.genSaltSync(saltRounds);

//GET BACK ALL THE UserS
router.get('/', async (req, res) => {
    try {
        const Users = await User.find();

        res.json(Users);

    }
    catch (err) {
        res.json({ message: err });
    }
});

router.post('/login', (req, res) => {
    let data = req.body;
    let email = data.email;
    let password = data.password;


    User.findOne({ email }).then((user) => {
        if (!user) { res.status(400).send({ message: "email incorrect " }); }



        var compare = user.password == md5(password);


        if (!compare) { res.status(400).send({ message: "password incorrect " }); }
        let token = jwt.sign({ id: user._id }, "med12")

        res.status(200).send({ token });
    }).catch((erreur) => {
        console.log('erreur');
        res.status(400).send(erreur);
    });




});
router.post('/register', async (req, res) => {
    data = req.body;
    let pswd = md5(data.password);
    let user = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        password: pswd
    });
    try {
        const savedUser = await user.save()
        res.json(savedUser);
    }
    catch (err) {
        res.json({ message: err });
    }
    user.save().then((userFromdb) => {

        res.status(200).send({ message: "ajout avec succes" })

    }).catch((erreur) => {
        res.status(400).send({ "message": "erreur : " + erreur })
    })

});

//SPECIFIC User
router.get('/find/:_id', async (req, res) => {


    console.log(req.params._id);
    try {
        const user = await User.findById(req.params._id)
        res.json(user);
    }
    catch (err) {
        console.log("erreur");
        res.json({ message: err });
    }
});

module.exports = router;