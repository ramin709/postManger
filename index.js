const {ApolloServer , gql} = require('apollo-server');
const mongoose = require('mongoose');
const {connectionLink} = require('./config.js');
const Post = require('./models/Post')
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello world' 
    }
}

mongoose.connect(connectionLink, {useNewUrlParser: true} ).then(res => {console.log('connected to the database');
return server.listen({port: 5000})}).then(console.log('server runs at port 5000'))

const server = new ApolloServer({typeDefs, resolvers});