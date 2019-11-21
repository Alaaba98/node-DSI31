const mongoose = require('mongoose');


const Promotion = mongoose.Schema({
    
    codePromo: {
        type:String,
        required: true
    },
    reduction:{
        type:Number,
        required:true,
         min: 1,
         max: 90
    },
    dateExpiration: {
        type: String,
        required:true
    }
}); 

module.exports = mongoose.model('Promotions',Promotion);