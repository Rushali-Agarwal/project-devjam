/*eslint-env es6*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const https = require("https");
const { dirname } = require("path");

//-----------Requiring Schema------- 
const Register = require("./models/registers");
const ADMIN = require("./models/admin_login");
//----------setting paths public---------
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

//---------------Connection to DB------------------

mongoose.connect("mongodb://127.0.0.1:27017/registeration")
mongoose.connection.on('connected',()=>console.log('DB connected'));
mongoose.connection.on('error',(err)=>console.log('DB not connected',err));

//-----------------source path--------------
const sourcePath = function(){
    let dir = __dirname;
    let arr = dir.split("\\")
    arr = arr.slice(0,arr.length-2)
    dir = arr.join("\\")
    return dir;
}

module.exports = sourcePath;

//----------main file Rendering----------------
app.get("/",(req,res)=>{
    res.sendFile(sourcePath()+"/index.html")
    

    console.log("Reached at index")
 })


// -----------------SIGNUP PAGE -------------
app.get("/signup/signup.html",(req,res)=>{
   res.sendFile( sourcePath()+"/signup/signup.html")
})

//creating new user
app.post("/signup", async(req,res) =>{
    console.log("reached at signup")
    try{
      const name = req.body.name;
       const email = req.body.email;
       const password = req.body.password;
       console.log('email accepted:'+req.body.email);
       const userData = new Register({
        name : name ,
        email: email,
        password:password
       })
       const registered = await userData.save();  // User successfully registered
  
      //after successfully registered directing user to Home page
        res.status(200).sendFile(sourcePath()+"/home/home.html");  // Redirecting to Home Page 
    }catch(error){
        res.status(400).send("<h1> add all the fields</h1>");
    }
    })
// -------------- USER LOGIN------------
app.post("/",async(req,res)=>{
    try {
     const email = req.body.email;
    const password = req.body.password;
    // console.log(req.body.email)
    const useremail = await Register.findOne({email:email});
   if(useremail.password===password){
    res.status(200).sendFile(sourcePath()+"/home/home.html");
   }
   else{
    alert("Wrong Credentials")
   }
        
    } catch (error) {
        res.status(400).send(" <h1> !!!!!! Wrong Credentials !!!!!!!!</h1>")
    }
    

}) 

//------------------------ADMIN LOGIN------------------------------
app.get("/admin/admin_login.html",(req,res)=>{
    res.sendFile(sourcePath()+"/admin/admin_login.html")
 })

  app.post("/admin_login",async(req,res)=>{
    try{
        console.log(req.body.name);
        const name = req.body.name;
         const password = req.body.password;
         const adminid = await ADMIN.findOne({name:name});
        if(adminid.password===password){         
            res.status(200).sendFile(sourcePath()+"/admin/admin.html"); // going to admin page
           }
           else{
            alert("Wrong Credentials You are not a admin?")
           }
        
       
      }catch(error){
          res.status(400).send("<h1>Wrong Credentials You are not a admin?</h1>");
      }
  })

//------------------!!!!!!!ROUTING!!!!!-------------------------
//   routing style.css
app.get("/style.css",(req,res)=>{
    res.sendFile(sourcePath()+"/style.css")
 })
 // routing signup.css
app.get("/signup/signup.css",(req,res)=>{
    res.sendFile(sourcePath()+"/signup/signup.css")
 })
 // routing logo png
 app.get("/images/logo.png",(req,res)=>{
    res.sendFile(sourcePath()+"/images/logo.png")
 })

 //routing background image
 app.get("/images/background.jpg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/background.jpg")
 })
 //routing banner image
 app.get("/images/banner.jpeg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/banner.jpeg")
 })
//routing admin_login.css
app.get("/admin/admin_login.css",(req,res)=>{
    res.sendFile(sourcePath()+"/admin/admin_login.css")
 })
 // routing admin_backgroundimage
 app.get("/admin/admin_background.jpeg",(req,res)=>{
    res.sendFile(sourcePath()+"/admin/admin_background.jpeg")
 })
 //routing admin.css file
 app.get("/admin/admin.css",(req,res)=>{
    res.sendFile(sourcePath()+"/admin/admin.css")
 })
// routing homepageCSS
app.get("/home/homepage.css",(req,res)=>{
    res.sendFile(sourcePath()+"/home/homepage.css")
 })
 // routing bootstrap.css
app.get("/bootstrap/bootstrap.css",(req,res)=>{
    res.sendFile(sourcePath()+"/bootstrap/bootstrap.css")
 })
 // routing home_style.css
app.get("/bootstrap/home_style.css",(req,res)=>{
    res.sendFile(sourcePath()+"/bootstrap/home_style.css")
 })
 //routing  image files
 app.get("/images/python.png",(req,res)=>{
    res.sendFile(sourcePath()+"/images/python.png")
 })
 app.get("/images/dsa.jpg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/dsa.jpg")
 })
 app.get("/images/java.jpg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/java.jpg")
 })
 app.get("/images/ds.jpg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/ds.jpg")
 })
 app.get("/images/c.jpg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/c.jpg")
 })
 app.get("/images/cpp.jpg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/cpp.jpg")
 })


 //------------Listening on port 3000 OR users PORT-------
app.listen(port,()=>{
    console.log('Server is running on  ' + port)
})