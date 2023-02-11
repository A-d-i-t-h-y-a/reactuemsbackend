const dotenv = require('dotenv')
const express = require('express')
const User = require("../models/User")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const fetchuser = require('../middleware/fetchuser')

dotenv.config()
const JWT_SECRET = `${process.env.JWT_SECRET}`
// Route 1: Creating an User

router.post('/create',[
    body('username').isLength({ min : 5 }),
    body('password').isLength({ min : 5 })
], async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({ error : "Enter Valid Input" })
        return;
    }
    try {
        let user = await User.findOne({username: req.body.username});
        if(user){
            return res.status(400).json({Error: "Username Already Exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            username: req.body.username,
            password: secpass
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken: authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

// Route 2 : login user
router.post('/login',[
    body('username').isLength({ min : 5 }),
    body('password').isLength({ min : 5 })
], async (req, res)=>{
    const {username, password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({ error : "Enter Valid Input" })
        return;
    }
    try {
        let success = false;
        let user = await User.findOne({username})
        if(!user){
            return res.status(400).json({success, Error: "Enter valid Details"})
        }
        let passcomp = await bcrypt.compare(password, user.password)
        if(!passcomp){
            return res.status(400).json({success, Error: "Enter valid Details"})
        }
        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, authToken: authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

// Route 3: fetch User Details
router.post('/user',fetchuser, async (req, res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

module.exports = router