const mongoose = require("mongoose")

const mangaSchema =mongoose.Schema({
    MangaName : {
        type : String
        // required : true
    },
    Chapters: {
        type: Array
        // required : true
    },
    Icon : {
        // data :  Buffer,
        contentType : String,
        path : String
    },
    Author : String,
    Genre : String,
    Description : String,
    User : String
})
mangaModel = mongoose.model("mangaModel",mangaSchema)
module.exports = mangaModel
