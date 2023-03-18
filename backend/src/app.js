/*eslint-env es6*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const https = require("https");
const { dirname } = require("path");

//Schema 
const Register = require("./models/registers");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

// Connection to DB

mongoose.connect("mongodb://127.0.0.1:27017/registeration")
mongoose.connection.on('connected',()=>console.log('DB connected'));
mongoose.connection.on('error',(err)=>console.log('DB not connected',err));

// main file Rendering
app.get("/",(req,res)=>{
    res.sendFile("C:/Users/22sho/OneDrive/Documents/GitHub/project-devjam/index.html")
    // res.sendFile(".../index.html")

    console.log("index")
 })


// -----------------SIGNUP PAGE -------------
app.get("/backend/src/signup.html",(req,res)=>{
   res.sendFile( `${__dirname}/signup.html`)
})

//creating new user
app.post("/signup", async(req,res) =>{
    console.log("reached here")
    try{
      const name = req.body.name;
       const email = req.body.email;
       const password = req.body.password;
       console.log('email accepted'+req.body.email);
       const userData = new Register({
        name : name ,
        email: email,
        password:password
       })
       const registered = await userData.save();  // User successfully registered
  
      //after successfully registered directing user to Home page
        res.status(200).sendFile(`${__dirname}/home.html`);  // Redirecting to Home Page 
    }catch(error){
        res.status(400).send(error);
    }
    })
// --------------LOGIN------------
app.post("/",async(req,res)=>{
    try {
     const email = req.body.email;
    const password = req.body.password;
    // console.log(req.body.email)
    const useremail = await Register.findOne({email:email});
   if(useremail.password===password){
    res.status(200).sendFile(`${__dirname}/home.html`);
   }
   else{
    alert("Bhaiya password or email galat hai")
   }
        
    } catch (error) {
        res.status(400).send(" <h1>Apni deatils hi yaad nhi hai nikal yha se chal</h1>")
    }
    

}) 


app.listen(port,()=>{
    console.log('Server is running on  ' + port)
})