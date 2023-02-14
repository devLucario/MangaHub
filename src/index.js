const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const mongoSession = require("connect-mongodb-session")(session)
const loginRoute = require("../routes/login")
const signupRoute = require("../routes/signup")
const logoutRoute = require("../routes/logout")
require("dotenv").config()
const PORT = process.env.PORT || 3000
const Base_URL = process.env.Base_URL

const mongoUri = process.env.MongoURI
const mongoConn = require("../db/conn")
mongoConn.connect()

// const store = new mongoSession({
//     uri : mongoUri,
//     collection : 'sessions'
// })

const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended : true}))
// app.use(session({
//     secret : 'key ',
//     resave : false,
//     saveUninitialized : false,
//     store : store
// }))

app.use("/login",loginRoute);app.use("/signup",signupRoute);app.use("/logout",logoutRoute);

app.get("/",(req,res)=>{
    // req.session.isAuth = true;
    res.render("home")
    // console.log(req.session)
    // console.log(req.session.id)
})


app.get("/profile/:name",(req,res)=>{
    res.render('dashboard',{Name : req.params.name})
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${Base_URL}`)
});