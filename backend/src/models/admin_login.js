const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        unique:true
    },
 
    password:{
        type:String,
        required:true
    }
})

//Collection
const ADMIN = new mongoose.model("ADMIN",adminSchema)
module.exports = ADMIN;