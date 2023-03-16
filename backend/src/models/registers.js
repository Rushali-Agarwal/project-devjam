const mongoose = require("mongooose");

const employeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required :true,
        unique:true
    }
    password:{
        type:String,
        required:true
    }
})

//Collection

const Register = new mongoose.model("Register",employeeSchema)
module.exports = Register;