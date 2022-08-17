const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            username: String,
            createdAt: String,
            body: String
        }
    ],

    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('Post' , postSchema);