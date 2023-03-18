const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        unique:false
    },
    email:{
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

const Register = new mongoose.model("Register",employeeSchema)
module.exports = Register;