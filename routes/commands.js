const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Command = require('../models/Command');
const readChunk = require('read-chunk');
const multipart = require('connect-multiparty');
const Post =require('../models/Post');
const User =require('../models/User');
//Add  tableau produit
router.post('/add', async (req, res) => {
let command= new Command(
    {  
       listeProduit : req.body.listeProduit ,
       id_User :  req.body.id_User,
       livraison : req.body.livraison,
       id_promo : req.body.id_promo,
       somme : req.body.somme,
    }
    );
    try 
      {
        const savedCommand = await command.save();
        res.json(savedCommand);
      }
    catch (err) 
        {
        res.json({ message: err });
       }

});

//add produit  to tableau  (idproduit)
router.post('/additem/:itemId', async (req, res) => {
  //id de la liste
    var itemId = req.params.itemId;
    var id =  req.body.id;
    var qte= req.body.qte;
    var libelle = req.body.libelle;
    var prix = req.body.prix;
    var ObjectID = require('mongodb').ObjectID;
    let cond = ObjectID.createFromHexString(itemId);
      // console.log(cond);
      //console.log(toBePushedObj);
    let update = { $push: { listeProduit : id, listeProduit :qte ,listeProduit : libelle ,listeProduit : prix} };
      //console.log(update);
   await  Panier.findByIdAndUpdate(cond,update, {new: true});
});
   

 /*
//Delete produit from  panier par  reference (idproduit)
router.post('/deleteitem/:itemId/:id', async (req, res) => {
 var itemId = req.params.itemId;
  var ObjectID = require('mongodb').ObjectID;
  let cond = ObjectID.createFromHexString(itemId);
    // console.log(cond);
  let toBePushedObj = { id: req.params.id};
    //console.log(toBePushedObj);
  let update = { $pull: { listeProduit : toBePushedObj } };
    //console.log(update);
 await  Panier.findByIdAndUpdate(cond,update, {multi: true});
});
*/
/*
//get objet par reference
router.get('/search', async (req,res) =>{
// var ref =  req.params.reference;
 //console.log(ref);
  Panier.find().then((panier) => {
      panier.forEach((x) => {
      x.listeProduit.forEach((liste)=>{
      console.log(liste.id);
      //var id= liste.id;
     // var produit = Post.find(liste.id);
        /*Post.forEach((listeP)=>
        {
        console.log(listeP);
        }
        )
    //const res= liste.find(liste=>Post._id === liste.id);
    //console.log(produit);

/*      try{
       // var p  =new Post();
        //p.findByIdAndUpdate(liste.id);
     // const post =   Post.find();
      
     // res.json(post);

      }
      catch (err)
      {
        res.json({ message: err });
      }

     }); 
    });
     
       
     
     
   
  });

});*/





module.exports=router;

