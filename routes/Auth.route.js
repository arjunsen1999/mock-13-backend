const express = require('express');
const authRouter = express.Router();
const { AuthModel } = require('../models/Auth.model');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 6;
const secretKey = process.env.scretKey;

authRouter.post("/signup", [
    body('fullName', "Enter a Full Name").not().isEmpty(),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a Valid Password").not().isEmpty(),
], async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg : errors.errors[0].msg });
        }

        let {fullName, email, password} = req.body;

        let isAuth = await AuthModel.findOne({email});
        if(isAuth){
            res.status(400).send({ msg : "This Email Already Exists Please Login" });
        }
        let hashPassword = await bcrypt.hash(password, saltRounds);

        let [base, end] = email.split("@");
        if(end == "masaischool.com"){
           await AuthModel.create({fullName, email, password : hashPassword, isAdmin : true});
        }else{
            await AuthModel.create({fullName, email, password : hashPassword});
        }
    
            res.send({msg : "Signup Successfully!"});

    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong", error})
    }
});



authRouter.post("/login", [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a Valid Password").not().isEmpty(),
], async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg : errors.errors[0].msg });
        }
        let {email, password} = req.body;

        let isAuth = await AuthModel.findOne({email});
        if(!isAuth){
            res.status(400).send({ msg : "Invalid Credentials" });
        }
        
        let isPasswordMatch = await bcrypt.compare(password, isAuth.password);
        if(isPasswordMatch){
            let token = jwt.sign({ _id : isAuth._id }, secretKey);
             res.send({msg : "Login Successfully", token, isAdmin : isAuth.isAdmin });
        }else{
            res.status(400).send({ msg : "Invalid Credentials" });
         }
    } catch (error) {
        res.send({msg : "Somthing Went Wrong", error})
    }
});



module.exports = {authRouter};