const mongoose = require('mongoose')
require('dotenv').config();


const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const Login = mongoose.model("Login", EmployeeSchema)
module.exports = Login