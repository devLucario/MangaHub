const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    // res.send("Logging you out...Please do not refresh the screen")
    req.session.destroy();
    
    setTimeout(()=>{ res.redirect('/')},2000)
    // destroy the cookie and express session
})

module.exports = router;