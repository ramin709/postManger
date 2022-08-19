const gql = require('graphql-tag');

const typeDefs = gql`
    type Post {
        id : ID!
        body: String!
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
    }
`;

module.exports = {
    typeDefs
}