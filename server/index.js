const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const User = require('./model/user')

const app = express()
app.use(express.json())
app.use(cors())

mongoose
.connect("mongodb://localhost:27017/register")
.then(() => {
    console.log("DB is connected...")
})
.catch((error)=>{
    console.log(error)
})

app.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        console.log(newUser)
        const {name, email} = newUser;
        const userExist = await User.findOne({email})
    
        if (userExist) {
            res.status(400).json({message: "User already exists."})
        } else {
        const savedData = await newUser.save();
        console.log(savedData)
        res.status(200).json({message: `Welcome ${name}! You are registered.`})
        }
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }

})

app.post("/login", async (req, res) => {
   try {
    const {email, password} = req.body
    userData = await User.findOne({email: email})
    console.log(userData)
    if(userData) {
            if(userData.password === password) {
                res.status(200).json({message: `Welcome ${userData.name}! You are logged in..`})
            } else {
                res.status(400).json({message: "the password is incorrect"})
            }
        } else {
            res.status(400).json({message: "No user found."})
        }
   } catch (error) {
        console.log(error)
   }
})

app.listen(3000,() =>{
    console.log(`Server is running on port `)
})