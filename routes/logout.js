const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("logout")

    // destroy the cookie and express session
})

module.exports = router;