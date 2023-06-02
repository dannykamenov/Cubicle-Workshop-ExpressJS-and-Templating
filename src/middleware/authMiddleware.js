const jwt = require('../utils/jwt');
const config = require('../config/config');



exports.auth = async (req, res, next) => {
    const token = req.cookies["auth"];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, config.production.SECRET);

            req.user = decodedToken;
            req.isAuth = true;
            res.locals.user = decodedToken.username;
            res.locals.isAuth = true;
        } catch (error) {
            res.clearCookie('auth');
            res.redirect('/404');
        }
    } 

    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.isAuth) {
        return res.redirect('/login');
    }

    next();
};