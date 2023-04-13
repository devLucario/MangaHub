const mongoose = require("mongoose")

const imageSchema =mongoose.Schema({
    MangaName : String,
    ChapterNo : {
        type : Number,
        required : true
    },
    ChapterName: {
        type: String
        // required : true
    },
    image : {
        data :  Buffer,
        contentType : String,
        path : String
    }
    // image : String
})
imageModel = mongoose.model("imageModel",imageSchema)
module.exports = imageModel
