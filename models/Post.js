const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    body: string,
    username: string,
    createdAt: string,
    comments: [
        {
            username: string,
            createdAt: string,
            body: string
        }
    ],

    likes: [
        {
            username: string,
            createdAt: string,
        }
    ],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('Post' , postSchema);