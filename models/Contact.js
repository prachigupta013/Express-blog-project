const mongoose = require( 'mongoose' )

//define schema 
const Contact_Schema = new mongoose.Schema( {
    name: {
        type: String,
        required:true
    },
    contact: {
        type: String,
        required:true 
    },
    email: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required:true
    }
}, { timestamps: true } )

// create collection 
const ContactModel = mongoose.model( 'contact', Contact_Schema )

module.exports=ContactModel