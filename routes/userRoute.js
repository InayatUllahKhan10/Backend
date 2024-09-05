const express = require ("express");
const mongoose = require("mongoose");
const User= require("../models/userModel");

const router= express.Router();
//create api

router.post("/", async(req , res) => {

    const {name , email , age} = req.body;
    const User = require ("../models/userModel");

    try {

          // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "Email already exists please  use diffrent email" });
    }
        const userAdded = await User.create({
            name , email,age
        });
        res.status(201).json(userAdded)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

router.get("/" , async(req , res) => {

try{
const showAll=  await User.find();

res.status(200).json(showAll);
}
catch(error){
    console.log(error);
    res.status(400).json({error:error.message});
}

// res.send("api running yes checked again and ggain");

});

//get single user
router.get("/:id" , async ( req,res) => {
    const {id} = req.params;
    try{
        const singleUser=  await User.findById({_id : id});
        
        res.status(200).json(singleUser);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message});
        }
});

//delete
router.delete("/:id" , async ( req,res) => {
    const {id} = req.params;
    try{
        const singleUser=  await User.findByIdAndDelete({_id : id});
        
        res.status(200).json(singleUser);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message});
        }
});

//put/patch
router.patch("/:id" , async ( req,res) => {
    const {id} = req.params;
    const {name , email , age} = req.body;
    try{
        const updateUser=  await User.findByIdAndUpdate(id , req.body,{
            new:true
        });
        
        res.status(200).json(updateUser);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message});
        }
});
module.exports = router;
   