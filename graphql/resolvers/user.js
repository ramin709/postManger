const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation : {
        async register(parent , {registerInput : {username , password , confirmPassword , email}} , context , info) {
            password = await bcrypt.hash(password , 12);

            const newUser = new User({
                email,
                password,
                confirmPassword,
                username,
            })

            const res = await newUser.save();

            const token = jwt.sign({email: res?.email, id: res?.id , username: res?.username})
        }
    }
}