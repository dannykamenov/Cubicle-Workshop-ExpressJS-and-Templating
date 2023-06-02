require('dotenv').config();
const mongo_uri = process.env.MONGODB_URI; 

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        //DB_URI: 'mongodb://127.0.0.1:27017/cubicle',
        DB_URI: mongo_uri,
        SECRET: 'SOMEPRODSECRET',
    },
    production: {
        //DB_URI: 'mongodb://127.0.0.1:27017/cubicle',
        DB_URI: mongo_uri,
        SECRET: 'SOMEDEVSECRET',
    }
};