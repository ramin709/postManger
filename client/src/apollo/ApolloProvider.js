import React from 'react'
import { ApolloClient, InMemoryCache, createHttpLink , ApolloProvider } from '@apollo/client'
import App from '../App'

const link = createHttpLink({
    uri: 'http://localhost:5000'
})

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)