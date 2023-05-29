module.exports = {
    development: {
        port: process.env.PORT || 3000,
        DB_URI: 'mongodb://127.0.0.1:27017/cubicle',
    },
    production: {
        DB_URI: 'mongodb://127.0.0.1:27017/cubicle',
    }
};