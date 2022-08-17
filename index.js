const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { connectionLink } = require('./config.js');
const {typeDefs} = require('./graphql/typeDefs.js')
const {resolvers} = require('./graphql/resolvers/index.js')

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(connectionLink, { useNewUrlParser: true }).then(res => {
    console.log('connected to the database');
    return server.listen({ port: 5000 })
}).then(console.log('server runs at port 5000'))
