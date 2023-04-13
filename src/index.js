const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const path = require("path")

// const flash = require("connect-flash")
// const mongoSession = require("connect-mongodb-session")(session)
const loginRoute = require("../routes/login")
const signupRoute = require("../routes/signup")
const logoutRoute = require("../routes/logout")
const mangaRoute = require("../routes/manga.js")
const profileRoute = require("../routes/profile.js")
require("dotenv").config()
const PORT = process.env.PORT || 5000
// const Base_URL = process.env.Base_URL

const mongoUri = process.env.MongoURI
// const mongoConn = require("../db/conn")
// const user = require("../models/user")
// mongoConn.connect()

// const store = new mongoSession({
//     uri : mongoUri,
//     collection : 'sessions'
// })

const app = express()
app.set('view engine','ejs')
// app.use(express.static(path.join(__dirname,"..","views","partials","images")))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
    secret : 'key ',
    resave : false,
    saveUninitialized : false,
    // store : store
}))
// app.use(flash());
app.use("/login",loginRoute);app.use("/signup",signupRoute);app.use("/logout",logoutRoute);
app.use("/manga",mangaRoute);app.use('/profile',profileRoute);
app.get("/",async(req,res)=>{
    const items = await mangaModel.find({}).catch((e)=>{console.log(e)})
    const arrItems = Array.from(items)
    // res.render('try',{items: arrItems})
    res.render("home2",{items: arrItems})
    
    
})


// app.get("/profile/:name",(req,res)=>{
//     res.render('try',{name : req.params.name})
// })
// app.get("/test",(req,res)=>{
//     res.render('home2')
// })
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});