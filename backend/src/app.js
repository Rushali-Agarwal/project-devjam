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
 //aboutus page route
 app.get("/aboutus/aboutus.html",(req,res)=>{
   res.sendFile(sourcePath()+"/aboutus/aboutus.html")
})
//aboutus css route
app.get("/aboutus/aboutus.css",(req,res)=>{
   res.sendFile(sourcePath()+"/aboutus/aboutus.css")
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
 app.get("/images/python.jpeg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/python.jpeg")
 })
 app.get("/images/about.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/about.jpg")
})
 app.get("/images/dsa.jpg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/dsa.jpg")
 })
 app.get("/images/java.jpeg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/java.jpeg")
 })
 app.get("/images/react.jpeg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/react.jpeg")
 })
 app.get("/images/c.jpeg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/c.jpeg")
 })
 app.get("/images/cpp.jpeg",(req,res)=>{
    res.sendFile(sourcePath()+"/images/cpp.jpeg")
 })
// courses

app.get("/course_pages/c.html",(req,res)=>{
   res.sendFile(sourcePath()+"/course_pages/c.html")
})

app.get("/course_pages/cpp.html",(req,res)=>{
   res.sendFile(sourcePath()+"/course_pages/cpp.html")
})

app.get("/course_pages/dsa.html",(req,res)=>{
   res.sendFile(sourcePath()+"/course_pages/dsa.html")
})

app.get("/course_pages/python.html",(req,res)=>{
   res.sendFile(sourcePath()+"/course_pages/python.html")
})

app.get("/course_pages/java.html",(req,res)=>{
   res.sendFile(sourcePath()+"/course_pages/java.html")
})

app.get("/course_pages/react.html",(req,res)=>{
   res.sendFile(sourcePath()+"/course_pages/react.html")
})

//......homepage......
app.get("/home/home.html",(req,res)=>{
   res.sendFile(sourcePath()+"/home/home.html")
})

//........course page images.......

//.....c page images..........
app.get("/images/1udemy_c.png",(req,res)=>{
   res.sendFile(sourcePath()+"/images/1udemy_c.png")
})

app.get("/images/2coursera_c.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/2coursera_c.jpg")
})

app.get("/images/3udemy_c.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/3udemy_c.jpg")
})

app.get("/images/4coursera_c.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/4coursera_c.jpg")
})

app.get("/images/4udemy_c.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/4udemy_c.jpg")
})

app.get("/images/8udemy_C.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/8udemy_C.jpg")
})

app.get("/images/5udemy_c.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/5udemy_c.jpg")
})

app.get("/images/c_back.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/c_back.jpg")
})

//.......cpp page images............

app.get("/images/1cpp.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/1cpp.jpg")
})

app.get("/images/2cpp.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/2cpp.jpg")
})

app.get("/images/3cpp.jpeg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/3cpp.jpeg")
})


app.get("/images/4cpp.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/4cpp.jpg")
})


app.get("/images/5cpp.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/5cpp.jpg")
})

app.get("/images/6cpp.png",(req,res)=>{
   res.sendFile(sourcePath()+"/images/6cpp.png")
})

app.get("/images/7cpp.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/7cpp.jpg")
})

app.get("/images/8cpp.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/8cpp.jpg")
})

// python pages images

app.get("/images/1python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/1python.jpg")
})
app.get("/images/2python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/2python.jpg")
})
app.get("/images/3python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/3python.png")
})
app.get("/images/4python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/4python.jpg")
})
app.get("/images/5python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/5python.jpg")
})
app.get("/images/6python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/6python.png")
})
app.get("/images/7python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/7python.jpg")
})
app.get("/images/8python.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/8python.png")
})
// react
app.get("/images/1react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/1react.jpg")
})
app.get("/images/2react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/2react.jpg")
})
app.get("/images/3react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/3react.jpg")
})
app.get("/images/4react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/4react.jpg")
})
app.get("/images/5react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/5react.jpg")
})
app.get("/images/6react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/6react.jpg")
})
app.get("/images/7react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/7react.jpg")
})
app.get("/images/8react.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/8react.jpg")
})
// java images 
app.get("/images/1java.png",(req,res)=>{
   res.sendFile(sourcePath()+"/images/1java.png")
})
app.get("/images/2java.png",(req,res)=>{
   res.sendFile(sourcePath()+"/images/2java.png")
})
app.get("/images/3java.jpg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/3java.jpg")
})
app.get("/images/4java.jpeg",(req,res)=>{
   res.sendFile(sourcePath()+"/images/4java.jpeg")
})

 //------------Listening on port 3000 OR users PORT-------
app.listen(port,()=>{
    console.log('Server is running on  ' + port)
})


