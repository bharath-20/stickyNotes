const express = require('express');
const router = express.Router();
const db = require("../models/users");
const { verifyToken } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdmin');

router.get("/all",verifyToken,isAdmin,async (req, res) => {
    try{ 
    const notes = await db.getAllUsers();
    res.status(200).json({ notes });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.patch("/promote", verifyToken, isAdmin, async (req , res)=>{
    try{
        await db.promoteUser(req.body.userId);
        res.status(200).json({ message : "Successfull" });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
   
})
module.exports =  router ;