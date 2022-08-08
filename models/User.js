const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: string,
    password: string,
    email: string,
    createdAt: string,
})

module.exports = mongoose.model('User', userSchema)