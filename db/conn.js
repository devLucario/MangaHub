const mongoose = require("mongoose")

const mongoUri = "mongodb://localhost:27017/Profile_proj"
mongoose.set('strictQuery', true);
// mongoose.connect(mongoUri,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{console.log(`mongoose connected`)}).catch((e)=>{console.log(e)})
exports.connect = async function() {
    try {
        let conn = await mongoose.connect(mongoUri)
        console.log(`connection successful`)
    } catch (error) {
        console.log(`Error! : ${error}`)
    }
}

// module.exports = connect();