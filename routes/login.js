const express = require("express")
const router = express.Router()
const User = require("../models/user")


router.get("/",(req,res)=>{
    res.render("login")
    // res.send("Heloo")
})
router.post("/",(req,res)=>{
    User.findOne({Username : req.body.uname},(err,search)=>{
        if(search){
            if(search.Password == req.body.pass){
                console.log(`Login successfull`,req.body.uname)
                res.render("dashboard")
            }
            else{
                console.log(`Wrong password`)
            }
        }
        else{
            console.log(`No such user`)
        }
    })
    // create an express session
})

module.exports = router;