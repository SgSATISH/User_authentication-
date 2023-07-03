const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        
    },
    password:{
        type:String
    },
    age:{
        type:String
    }
})

const Usermodel = new mongoose.model('ending',userSchema);
module.exports = Usermodel;