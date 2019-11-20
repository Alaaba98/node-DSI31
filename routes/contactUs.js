const express = require('express');
const router = express.Router();
const User = require('../models/ContactUs');

// ajouter un message d'un client ou d'un visiteur
router.post('/addcontact', async (req, res) => {
    data = req.body;
    let contact = new ContactUs({
        email: data.email,
        sujet: data.sujet,
        message: data.message
    });
    try {
        const savedContact = await contact.save()
        res.json(savedContact);
    }
    catch (err) {
        res.json({ message: err });
    }
    contact.save().then((contactFromdb) => {

        res.status(200).send({ message: "ajout avec succes" })

    }).catch((erreur) => {
        res.status(400).send({ "message": "erreur : " + erreur })
    })

});

// chercher message 
router.get('/findcontact/:id', async (req, res) => {

    try {
        const contact = await ContactUs.findById(req.params.id)

        res.json(contact);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// repondre au message du client ou le visiteur
router.patch('/responsecontact/:id', async (req, res) => {
    var item = {
        reponse: req.body.reponse,
        reponseAdmin: true
    };
    try {
        const updatedContact = await ContactUs.updateOne({ _id: req.params.id }, { $set: item })

        res.json(updatedContact);
    }
    catch (err) {
        res.json({ message: err });
    }

});

// Supprimer messsage d'un client ou d'un visiteur
router.delete('/deletecontact/:id', async (req, res) => {
 try {
        const removedContact = await ContactUs.remove({ _id: req.params.id });
        res.json(removedContact);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);


module.exports = router;