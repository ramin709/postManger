const User = require('../../models/User.js');
const { UserInputError } = require('apollo-server')
const {validity , validityForLogIn} = require('../../utilities/validation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { secret } = require('../../config')

const generateToken = (user) => {
    return jwt.sign({ email: user?.email, id: user?.id, username: user?.username }, secret, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {

        async login(parent , {loginInput: {username, password}}) {
            
            const {errors, valid} = validityForLogIn(username , password);

            if(!valid) {
                throw new UserInputError('Errors' , errors)
            }

            const user = await User.findOne({username});

            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found' , errors)
            }
            
            const pass = await bcrypt.compare(password, user.password)

            if(!pass){
                errors.general = 'Password incorrect'
                throw new UserInputError('Password incorrect' , errors)
            }

            const token = generateToken(user);


            return {
                ...user?._doc,
                id: user._id,
                token
            }

        },



        async register(parent, { registerInput: { username, password, confirmPassword, email } }) {

            const {errors , valid} = validity(username , password , confirmPassword , email);

            if(!valid) {
                throw new UserInputError('Errors' , errors)
            }

            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError(
                    'This username is already registered'
                );
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                password,
                confirmPassword,
                username,
                createdAt: new Date().toISOString(),
            })

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res?._doc,
                id: res._id,
                token
            }
        }
    }
}