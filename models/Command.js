const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
var Schema = mongoose.Schema;
const PostCommand =new  Schema({
     listeProduit : [
          
         {
             id: 
               {
                  type: Schema.Types.ObjectId,
                  ref : 'Post'
               },
               qte: 
               { type : Schema.Types.Number,
                ref:  'Post'

               },
               libelle:
               {
                type : Schema.Types.String,
                ref:  'Post'
               },
               prix:
               {
                type : Schema.Types.Number,
                ref:  'Post'
               }
        }
      ],
      id_User :   
      {
                     type: Schema.Types.ObjectId,
                     ref : 'User'
      },
     
      livraison :
      {
          type:String,
          required:true
      },
      somme:
      {
        type:Number,
        required:true
    }
     

});
module.exports = mongoose.model('Commands',PostCommand);
