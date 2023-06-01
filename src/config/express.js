const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

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
};