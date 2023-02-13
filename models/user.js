const mongoose = require("mongoose")

const userSchema = {
    Name : String,
    Age  : Number,
    Sex  : String,
    Username : String,
    Password : String
}

module.exports = mongoose.model('user',userSchema,"users")
