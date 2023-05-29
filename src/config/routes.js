const express = require('express');
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');

// TODO: Require Controllers...

module.exports = (app) => {
    app.use(homeController);
    app.use('/cubes',cubeController);
    app.use('/accessory', accessoryController);
    app.get('*', (req, res) => {
        res.redirect('/404');
    });
};