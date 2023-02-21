const mongoose = require('mongoose')


const uri ="mongodb+srv://prachigupta046:1234567abc@cluster0.b0ibf.mongodb.net/blog123?retryWrites=true&w=majority"
const connectDB=()=>{
    //return mongoose.connect('mongodb://0.0.0.0:27017/Blogwebsite')
    return mongoose.connect(uri)
    .then(()=>{
        console.log('Connection successful')
    })
    .catch((err)=>{
        console.log(err)
    })
}
mongoose.set('strictQuery', false);
module.exports=connectDB
