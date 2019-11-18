const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Panier = require('../models/Panier');
const readChunk = require('read-chunk');
const multipart = require('connect-multiparty');
const Post =require('../models/Post');
//Add  panier
router.post('/add', async (req, res) => {
let p= new Panier(
    {  
       listeProduit : req.body.listeProduit ,
    }
    );
    try 
      {
        const savedPanier = await p.save();
        res.json(savedPanier);
      }
    catch (err) 
        {
        res.json({ message: err });
       }

});

//add produit  to panier (idproduit)
router.post('/additem/:itemId/:id', async (req, res) => {
  //id de la liste
    var itemId = req.params.itemId;
    var ObjectID = require('mongodb').ObjectID;
    let cond = ObjectID.createFromHexString(itemId);
      // console.log(cond);
    let toBePushedObj = {id: req.params.id};
      //console.log(toBePushedObj);
    let update = { $push: { listeProduit : toBePushedObj } };
      //console.log(update);
   await  Panier.findByIdAndUpdate(cond,update, {new: true});
});
   
  
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
        )*/
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
      }*/

     }); 
    });
     
       
     
     
   
  });

});





module.exports=router;

