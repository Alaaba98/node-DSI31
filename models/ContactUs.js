const mongoose = require('mongoose');


const ContactUs = mongoose.Schema({
    
    email: {
        type:String,
        required: true
    },
    sujet: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required:true
    },
    reponse: {
        type: String
    },
    reponseAdmin: {
        type: Boolean
    },

}); 

module.exports = mongoose.model('ContactUs',ContactUs);