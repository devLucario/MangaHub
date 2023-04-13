const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/",(req,res)=>{
    res.render("signup",{usernameExists : false, diffPass : false})
})

// for the form submision
router.post("/",async(req,res)=>{
    const user = req.body.username;

    // checking for same username
    await User.findOne({Username : user}).then((search)=>{
        res.render("signup",{usernameExists : true,diffPass: false})
    }).catch((e)=>{
        if(req.body.pass==req.body.cpass){
            const data = new User({
                Name : req.body.name,
                Age : req.body.age,
                Sex : req.body.sex,
                Username : user,
                Password : req.body.pass
            })
            data.save()
            // .then(()=>{
            //     // req.flash('success', 'Account created successfully!');
            // })
            // .catch((err)=>{
            //     res.status(500).send(err)
            // })
            
            alert("Account created successfully !!")
            setTimeout(()=>{
                console.log(`Redirecting to login...`)
                res.render("login")
            },3000)
        }
        else{
            res.render("signup",{usernameExists : false,diffPass : true})
        } 
    })
})
    // checking for similar password in boyh fields
      


module.exports = router;