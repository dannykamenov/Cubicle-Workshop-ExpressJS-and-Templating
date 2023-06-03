const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long!'],
        validate: {
            validator: (v) => {
                return /^[A-Za-z0-9]+$/.test(v);
            },
            message: 'Username should consist only english letters and digits!',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password must be at least 8 characters long!'],
        validate: [/^[A-Za-z0-9]+$/, 'Password should consist only english letters and digits!']

    },
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;