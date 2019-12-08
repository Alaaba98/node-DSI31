const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ContactUs = require('../models/ContactUs');
const nodemailer = require("nodemailer");


//GET BACK ALL contactus
router.get('/', async (req, res) => {
    try {
        const contact = await ContactUs.find();

        res.json(contact);

    }
    catch (err) {
        res.json({ message: err });
    }
});


// ajouter un message d'un client ou d'un visiteur
router.post('/addcontact', async (req, res) => {
    
    try {
        data = req.body;
        let contact = new ContactUs({
            email: data.email,
            sujet: data.sujet,
            message: data.message,
            reponse: "",
            reponseAdmin: false
        });
        const savedContact = await contact.save()
        res.json(savedContact);
    }
    catch (err) {
        res.json({ message: err });
    }
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

    console.log("request came");
      let user = req.body.mail;
      let reponse = req.body.reponse;
      sendMail(user,reponse, info => {
        res.send(info);
        console.log(`The mail has beed send 😃 `);
      });

});


async function sendMail(user,reponse, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
      user: "medmeherzi11@hotmail.com",
      pass: "Asusroglife12"
    }
  });

  let mailOptions = {
    from: 'medmeherzi11@hotmail.com', // sender address
    to: user, // list of receivers
    subject: "Reponse a votre question", // Subject line
    html: "<h1>"+reponse+"</h1>"
  };

  // send mail with defined transport object
  let info = transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});

  callback(info);
  }



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