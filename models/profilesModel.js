const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: String,
    image: String,
    about: String,
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile