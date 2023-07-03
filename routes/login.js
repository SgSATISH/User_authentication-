const express = require('express')
const app= express()
app.use(express.json());

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
        console.log("🚀 ~ file: app.js:60 ~ awaitbcrypt.compare ~ expiresIn:", expiresIn)
     
        
         return res.send({message:'login successfull',token:token})
       

      }else{
        res.send('invalid ')
      }
      
  });
    
   

})
