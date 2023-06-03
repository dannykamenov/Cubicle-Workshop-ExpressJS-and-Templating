const User = require('../models/User');
const jwtCallback = require('../utils/jwt');
const config = require('../config/config');

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login =  async (username, password) => {
    const user = await this.getUserByUsername(username);

    if(!user) {
        throw {
            message: 'Invalid username or password!',
            payload: { user }
        }

    }

    const isValid = await user.validatePassword(password);
    if (!isValid) { throw 'Invalid username or password!'; }

    const payload = { _id: user._id, username: user.username};
    const token = await jwtCallback.sign(payload, config.production.SECRET, { expiresIn: '3h' });

    return token;

};
