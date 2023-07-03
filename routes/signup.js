const express = require('express')
const app= express()
app.use(express.json());

app.post('/signup',async(req,res)=>{
    const {name,email,password,age}=req.body;
    bcrypt.hash(password, 10, function(err, hash) {
     if(err){
       res.send('error')
     }
     const user = new Usermodel({
       name,
       email,
       password:hash,
       age
      })
   
     user.save();
     res.send('sign up successfully')
     
 });
 
 
 });
 