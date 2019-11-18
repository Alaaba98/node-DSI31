const mongoose = require('mongoose');

const Post = require('../models/Post');

var Schema = mongoose.Schema;
const PostPanier =new  Schema({
     listeProduit : [
          
         {
             id: 
               {
                  type: Schema.Types.ObjectId,
                  ref : 'Post'
               }
        }
      ]
     

});
module.exports = mongoose.model('Paniers',PostPanier);
