const express = require('express');
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const authController = require('../controllers/authController');
const { isAuth } = require('../middleware/authMiddleware');

// TODO: Require Controllers...

module.exports = (app) => {
    app.use(homeController);
    app.use('/cubes',isAuth,cubeController);
    app.use('/accessory', isAuth ,accessoryController);
    app.use('/',authController);
    app.get('*', (req, res) => {
        res.redirect('/404');
    });
};