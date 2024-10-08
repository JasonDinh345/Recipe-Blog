const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)