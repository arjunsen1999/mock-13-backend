const express = require('express');
const jobRouter = express.Router();
const { jobModel } = require('../models/Job.model');
const { body, validationResult } = require('express-validator');
const {VerifyToken} = require("../middleware/VerifyToken");


jobRouter.post("/add", VerifyToken, async (req, res) =>{
        
    try {
        let adminId = req.authId;
        let {companyName, position, contract, location} = req.body;
        if(!companyName || !position || !contract || !location){
            res.status(400).send({msg : "Enter all the input"});
        }
        await jobModel.create({adminId, companyName, position, contract, location});
        res.send({msg : "Add Successfully"});
    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong"});
    }

});

jobRouter.patch("/update/:id", async (req, res) =>{
        
    try {
        let _id = req.params.id;
        await jobModel.findByIdAndUpdate({_id}, req.body);
        res.send({msg : "Update Successfully"});
    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong"});
    }

});

jobRouter.delete("/delete/:id", async (req, res) =>{
        
    try {
        let _id = req.params.id;
        await jobModel.findByIdAndDelete({_id});
        res.send({msg : "Delete Successfully"});
    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong"});
    }

});

jobRouter.get("/get", VerifyToken, async (req, res) =>{
    try {
        let adminId = req.authId;
        let adminData = await jobModel.find({adminId});
        res.send(adminData);
    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong"});
    }
})

jobRouter.get("user/get", async (req, res) =>{
    try {
      let allData = await jobModel.find();
      res.send(allData);
    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong"});
    }
})



module.exports = {jobRouter}