const postsResolver  = require('./post.js');
const usersResolver = require('./user.js');
const commentsResolver = require('./comments.js');

module.exports = {
    resolvers: {

        Post: {
            likesCount: (parent) => parent.likes.length,
            commentsCount: (parent) => parent.comments.length 
        },

        Query: {
            ...postsResolver.Query
        },

        Mutation: {
            ...usersResolver.Mutation,
            ...postsResolver.Mutation,
            ...commentsResolver.Mutation
        }
    }
}