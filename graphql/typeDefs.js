const gql = require('graphql-tag');

const typeDefs = gql`
    type Post {
        id : ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment {
        id: ID!
        username: String!
        createdAt: String!
        body: String!
    }

    type Like {
        username: String!
        createdAt: String!
    }

    type Query{
        getPosts: [Post]
        getPost(postId: ID!) : Post!
    }

    type User {
        id: ID!,
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }

    input loginInput {
        username: String!,
        password: String!,
    }

    input RegisterInput {
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: loginInput): User!
        createPost(body: String!) : Post!
        deletePost(postId: ID!) : String!
        createComment(postId: ID! , body: String!) : Post!
        deleteComment(postId: ID! , commentId: ID!) : Post!
        like(postId: ID!) : Post!
    }
`;

module.exports = {
    typeDefs
}