const mongoose = require('mongoose');
const dbUri = 'mongodb://127.0.0.1:27017/cubicle';
const config = require('./config').development.DB_URI;


async function connectToDatabase() {
    await mongoose.connect(config);

    console.log('Database connected!');
}

module.exports = connectToDatabase;