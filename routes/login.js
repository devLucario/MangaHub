const express = require("express")
const router = express.Router()
const User = require("../models/user")


router.get("/",(req,res)=>{
    res.render("login")
    // res.send("Heloo")
})
router.post("/",(req,res)=>{
    const user = req.body.uname;
    User.findOne({Username : user},(err,search)=>{
        if(search){
            if(search.Password == req.body.pass){
                console.log(`Login successfull`,user)
                res.render("dashboard",{username : user})
                req.session.user = user
                req.session.authorized = true
            }
            else{
                console.log(`Wrong password`)
            }
        }
        else{
            console.log(err)
            res.send(`No such user`).status(400)

        }
    })
    // create an express session
})

module.exports = router;