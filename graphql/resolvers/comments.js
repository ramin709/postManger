const Post = require('../../models/Post.js');
const checkAuth = require('../../utilities/checkAuth.js')
const {AuthenticationError,UserInputError} = require('apollo-server')

module.exports = {
    Mutation: {
        createComment: async(parent , {postId , body} , context) => {
            const {username} = checkAuth(context);

            if(body.trim() === '') {
                throw new UserInputError('Error' , {
                    errors: 'the body must not be empty',
                })
            }

            const post = await Post.findById(postId);

            if(post){

                post.comments.unshift({
                    username,
                    body,
                    createdAt: new Date().toISOString()
                })

                await post.save();

                return post;

            }else throw new UserInputError('Post does not exist')
        },

        deleteComment: async(parent , {postId , commentId} , context) => {
            const {username} = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId);

                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex , 1);
                    await post.save();
                    return post
                }else throw new AuthenticationError('action not allowed');
            }else throw new UserInputError('the post not exist')
        }
    }
}