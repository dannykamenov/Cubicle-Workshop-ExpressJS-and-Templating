const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middleware/authMiddleware'); 

module.exports = (app) => {
    
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');
    app.set('views', 'src/views')

    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: false })); // Form data gets sent to req.body

    //TODO: Setup the static files
    app.use(express.static(path.resolve(__dirname, '../static')));

    app.use(cookieParser());

    app.use(authMiddleware.auth); // This middleware will be executed on every request and will check if the user is authenticated
    //This middleware should be placed after the cookie parser middleware, because it will check if the user is authenticated by checking the cookies
    //This middleware should be placed before the routes, because it will add the user to the request object and the routes will need it
};