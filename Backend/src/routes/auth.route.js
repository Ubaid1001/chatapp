import express from "express";
import { signup, signin, logout, updateProfile, } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"
import { arcjetProtection } from "../middleware/arcjet.middleware.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.put("/updateProfile", protectRoute, updateProfile);
router.get('/check', protectRoute, (req, res) => res.status(200).json(req.user));

router.get("/test",arcjetProtection,(req,res)=>{
    res.status(200).json({message:"test route"})
});

export default router