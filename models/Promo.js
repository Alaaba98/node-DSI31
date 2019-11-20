const mongoose = require('mongoose');


const Promotion = mongoose.Schema({
    
    codePromo: {
        type:String,
        required: true
    },
    reduction:{
        type:number,
        required:true,
         min: 1,
         max: 90
    }
    dateExpiration: {
        type: Date,
        required:true
    }
}); 

module.exports = mongoose.model('Promotions',Promotion);