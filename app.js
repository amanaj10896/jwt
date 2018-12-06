 const express= require('express');
 const jwt = require('jsonwebtoken');
 const body_parser=require('body-parser');
 const app = express();
 app.use(body_parser.json());
 let verifyToken = (req,res,next)=>{
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
       // Split at space
       const bearer = bearerHeader.split(' ');
       console.log(bearer);
       console.log(bearer[2]);

       //getting token aftr split
       const bearerToken = bearer[1];
       console.log(bearerToken);
   

       req.token=bearerToken;
       next();
    }else{
        res.sendStatus(403);
    }

}

 app.get('/api',(req,res)=>{
     res.json({
         message:'welcome to api'
     })
 })

 app.post('/api/posts', verifyToken ,(req,res)=>{
     jwt.verify(req.token,'secretkey',(err, authData)=>{
         if(err){
             res.sendStatus(403);
         }else{
             res.json({
                 message:'post created',
                 authData
             });
         }
     })
 })

 app.post('/api/login',(req,res)=>{
     // mock user
     console.log(req.body);
     const user={
         username: req.body.username
     }
     jwt.sign({user},'secretkey',{expiresIn: "10m"},(err,token)=>{
         res.json({
             token
         });
     });
 });


 // format of token
 // Authorization: Bearer <access_token>
 //verify token
 
 app.listen(5001,()=>console.log('server started'));