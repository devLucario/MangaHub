const express = require("express")
const router = express.Router()

router.get("/:username",(req,res)=>{
    res.render("dashboard",{username : req.params.username})
})
module.exports = router;