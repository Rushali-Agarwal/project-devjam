/*eslint-env es6*/
const express = require("express");
const app = express();
// require("./db/conn.js")
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const https = require("https");
const { dirname } = require("path");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

// Connection to DB

mongoose.connect("mongodb://127.0.0.1:27017/registeration")
mongoose.connection.on('connected',()=>console.log('connected'));
mongoose.connection.on('error',(err)=>console.log('not connected',err));

app.get("/",(req,res)=>{


  res.send("Hello")
})

app.post("/register",async(req,res)=>{
    try{
       const email = req.body.email;
       const password = req.body.password;
       console.log(req.body.email);

    }catch(error){
        res.status(400).send(error);
    }
    
  
       

    })



app.listen(port,()=>{
    console.log('Server is running on  ' + port)
})