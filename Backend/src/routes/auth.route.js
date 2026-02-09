import express from "express";


const router = express.Router();


router.get("/signup", (req, res) => {
    res.send("signup called")
})

router.get("/signin", (req, res) => {
    res.send("signin called")
})

router.get("/logout", (req, res) => {
    res.send("logout called")
})


export default router