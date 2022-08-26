const Post = require('../../models/Post.js')
const {AuthenticationError, UserInputError} = require('apollo-server')
const checkAuth = require('../../utilities/checkAuth.js')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                console.log(posts);
                return posts;
            } catch (error) {
                throw new Error(error.message)
            }
        },

        async getPost(parent, { postId }) {
            try {
                const post = await Post.findById(postId);

                if (post) {
                    return post;
                } else {
                    throw new Error('No post found')
                }

            } catch (error) {
                throw new Error(error)
            }
        }


    },

    Mutation: {
        async createPost(parent , {body} , context) {
            const user = checkAuth(context);

            const newPost = new Post({body , username: user?.username , id: user?.id , createdAt: new Date().toISOString()});

            const post = await newPost.save();

            return post;
        } ,

        async deletePost(parent , {postId} , context) {
            const user = checkAuth(context);

            const post = await Post.findById(postId);

            if(user.username === post.username){
                post.delete();
                return 'The post deleted successfully'
            }else{
                throw new AuthenticationError('action not allowed')
            }
        },

        async like(parent , {postId} , context) {
            const {username} = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){

                if(post.likes.find(like => like.username === username)){
                   post.likes.filter(like => like.username !== username)
                }else{
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save();
                return post;
            }else throw new UserInputError('the post not exist')
        }
    }
}