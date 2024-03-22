const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee');
const { dbConnection } = require("./database/dbConnection");

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });




const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["POST"],
    credentials: true,
}));
app.use(express.urlencoded({extended: true}));


dbConnection();

app.post("/login", (req,res) => {
    const {email,password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
      if(user) {
            if(user.password === password) {
                res.json("Success")
            }
            else {
                res.json("The password is incorrect")
            }
        }
        else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req,res) => {
    EmployeeModel.create(req.body)
    .then(employees =>res.json(employees))
    .catch(err => res.json(err))
})

app.get("/", (req,res,next) => {
    return res.status(200).json({
        success: true,
        message: "HELLO WORLD"
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server Running On Port ${process.env.PORT}`)
})


