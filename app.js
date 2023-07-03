const express = require('express');
const mongoose= require('./dbConnection');
const Usermodel = require('./models/User.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const expressSession= require('express-session')
const { initializePassport } = require('../Satish_auth/passport');
initializePassport(passport);

  

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSession({secret:"secret",resave: false,
saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());


//signup route

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




//login route
app.post('/login', async(req,res)=>{
    const {email,password}=req.body;
    const user = await  Usermodel.findOne({email});
    
  
   
    if(!user){
      return res.send('invalid cradintials')
  } 
  
   
    const hash_pass =user.password;
    await bcrypt.compare(password,hash_pass, function(err, result) {
    
      if(err){
        return res.send('try again')
      }if(result==true){
        
        const expiresIn = '1h'; // token expiration set 1 hours
        const token = jwt.sign({email:user.email,name:user.name,age:user.age}, 'secret', { expiresIn });
     
        
         return res.send({message:'login successfull',token:token})
       

      }else{
        res.send('invalid ')
      }
      
  });
    
   

})


// find perticular person's data then we use this 
//and verify token // we genetaing the token and send back to the user
//and protected route

app.get('/profile/:id',async (req,res)=>{
    const id = req.params.id;
   
    // const user_token = req.headers.authorization
   const user_token = req.headers.authorization.split(" ")[1] // (if token with Bearer then we use split )
   

    jwt.verify(user_token, 'secret',function (err,decoded){
      if(err){
        res.send('login agaian')
    }
    console.log(decoded)
    })  
   
  
   try{
     const user =await Usermodel.find({_id:id})
     return res.send(user)
   }
   catch{
      return res.send('not found')
   }
 })




app.listen(4500,(req,res)=>{
    console.log('server running')
});