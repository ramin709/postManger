const jwt = require('jsonwebtoken')
const {secret} = require('../config.js');
const {AuthenticationError} = require('apollo-server');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        const token = authHeader.split('Bearer ')[1];

        if(token){
            try {
                const user = jwt.verify(token , secret);
                return user;
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }else {
            throw new Error('Authentication token must be \' Bearer \' format')
        }
    }else{
        throw new Error('Authentication token must be provided')
    }
}