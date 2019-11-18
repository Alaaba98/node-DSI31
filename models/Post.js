const mongoose = require('mongoose');


const PostProduit = mongoose.Schema({
    reference: {
        type:Number,
        required: true
    },
    libelle: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    prix: {
        type: Number,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    qte: {
        type: Number,
        required:true
    }
}); 

module.exports = mongoose.model('Posts',PostProduit);