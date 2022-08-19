const Post = require('../../models/Post.js')

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


    }
}