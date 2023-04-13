const express = require("express")
const router = express.Router()
const mongoConn = require("../db/conn")
const User = require("../models/user")
// mongoConn.connect()


router.get("/",(req,res)=>{
    // const messages = req.flash('success')
    res.render("login")
    // res.send("Heloo")
})
router.post("/",async(req,res)=>{
    const user = req.body.uname;
    await User.findOne({Username : user}).then((search)=>{
        if(search.Password == req.body.pass){
            console.log(`Login successfull`,user)
            
            // res.render("dashboard",{username : user})
            res.redirect("profile/"+user);
            // req.session.user = user
            // req.session.authorized = true
        }
        else{
            console.log(`Wrong password`)
        }
    }).catch((err)=>{
        console.log(err)
        res.send(`No such user`).status(400)
    })
        
    // create an express session
})

module.exports = router;