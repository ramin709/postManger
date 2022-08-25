const postsResolver  = require('./post.js');
const usersResolver = require('./user.js');

module.exports = {
    resolvers: {
        Query: {
            ...postsResolver.Query
        },

        Mutation: {
            ...usersResolver.Mutation,
            ...postsResolver.Mutation
        }
    }
}