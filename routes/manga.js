const express = require("express")
const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
const multer = require("multer")
const imagemodels = require("../models/imageModel")
const mangaModel = require("../models/mangaModel")
const fs = require('fs')
// require('dotenv').config()

const PORT = process.env.PORT || 3000
const CompassURI = "mongodb://localhost:27017/uploads"


const router= express.Router()
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.set("view engine",'ejs')
// app.use(express.static('public'))


mongoose.connect(CompassURI).then(()=>{
    console.log(`MongoDB connected`)
}).catch((e)=>{
    console.log(`Some ERROR has occured`)
    console.log(e)
})

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./public/uploads/')
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname);
    }
})
const upload = multer({
    storage: Storage
}).array('images',100)


    // res.send("App is running")
router.get('/', async (req, res) => {
    const items = await imagemodels.find({})
    .catch((err)=>{ 
        console.log(err);
        res.status(500).send('An error occurred', err);
    })
        
    // console.log(items)
    const arrItems = Array.from(items)
    // console.log(arrItems)
    // console.log(mangaModel.findOne({}).exec())
    res.render('index', { items: arrItems });
});

router.post("/upload",upload,async(req,res)=>{
    // console.log(req.files)

    if(await mangaModel.findOne({MangaName : req.body.MangaName})){
        console.log('in if block')
        await mangaModel.updateOne({MangaName : req.body.MangaName},{$push : {Chapters : Number(req.body.ChapterNo)}}).then(console.log(`Array updated`))
    }
    else{
        const newManga = new mangaModel({
            MangaName : req.body.MangaName,
            Chapters : [Number(req.body.ChapterNo)],
            Icon : {
                contentType : req.files[0].mimetype,
                path : req.files[0].filename
            }
        })
        await newManga.save().then(console.log(`New manga saved`))
    }

    req.files.forEach(async(img)=>{
        const newImage = new imageModel({
            MangaName : req.body.MangaName,
            ChapterNo : req.body.ChapterNo,
            ChapterName : req.body.name,
            image : {
                data : fs.readFileSync("./public/uploads/"+img.filename),
                contentType : img.mimetype,
                path : img.filename
            }
        })
        await newImage.save().then(console.log("mongo save!!"))
    })
    
    res.send("Successfully uploaded !")
})

router.get('/newManga',async(req,res)=>{
    // const items = await mangaModel.find({}).catch((e)=>{console.log(e)})
    // const arrItems = Array.from(items)
    // res.render('try',{items: arrItems})
    res.render("newManga")
})

router.post("/newManga",upload,async(req,res)=>{
    const newManga = new mangaModel({
        MangaName : req.body.MangaName,
        Author : req.body.Author,
        Genre : req.body.Genre,
        Description : req.body.Desc,
        Icon : {
            contentType : req.files[0].mimetype,
            path : req.files[0].filename
        }
    })
    await newManga.save().then(console.log(`New manga created successfully`))
    res.send("New manga saved")
})

router.get("/:mangaName",async(req,res)=>{
    const manga = await mangaModel.findOne({MangaName : req.params.mangaName})
    console.log(manga);
    res.render('individual-manga',{manga : manga})
})

router.get("/:mangaName/c:chapterNo",async(req,res)=>{
    // all the images in this chapter
    const chapter = await imageModel.find({MangaName : req.params.mangaName,ChapterNo : req.params.chapterNo})
    chapter.sort((a,b)=>{
        a = Number(a.image.path.slice(15,18));
        b = Number(b.image.path.slice(15,18));
        if(a>b) return 1;
        else if(b>a) return -1;
        else return 0;
    })
    // the list of chapters in this manga ----- for next & prev button
    const manga = await mangaModel.findOne({MangaName : req.params.mangaName})
    let notStart = false;let notEnd = false;
    if(manga.Chapters[0]!=req.params.chapterNo) notStart = true;
    if(manga.Chapters[manga.Chapters.length-1]!=req.params.chapterNo) notEnd = true;
    // console.log(manga.Chapters[-1])
    res.render('manga-viewer',{chapter : chapter,notStart : notStart, notEnd : notEnd})
})

module.exports = router;