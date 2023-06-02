const User = require('../models/User');
const jwtCallback = require('../utils/jwt');
const config = require('../config/config');

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login =  async (username, password) => {
    const user = await this.getUserByUsername(username);

    const isValid = await user.validatePassword(password);
    if (!user || !isValid) { throw 'Invalid username or password!'; }

    const payload = { username: user.username};
    const token = await jwtCallback.sign(payload, config.production.SECRET, { expiresIn: '3h' });

    return token;

};
