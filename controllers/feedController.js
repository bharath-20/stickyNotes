const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();
const db = require('../models/notes'); 


router.get("/", verifyToken, async (req, res)=>{
    try{ 
        const userRole = req.user.role;
        const userId = req.user.userId;
        let notes ;
        if(userRole === "USER")
        {
            notes = await db.getUserPublicNotes(userId);
            
        }else
        {
            notes = await  db.getAllPublicNotes();
        }
        res.status(200).json({ notes });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        } 
});



module.exports = router ;