const router = require("express").Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res, next ) => {
    const { username, password } = req.body;
    
    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, { httpOnly: true })
    } catch (error) {
        return next(new Error('Invalid username or password!'));
    }

    res.redirect('/');

});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return next(new Error('Passwords don\'t match!'));
    }

    const existingUser = await authService.getUserByUsername(username);
    if(existingUser){
        return next(new Error('User already exists!'));
    }

    try {
        const user = await authService.register(username, password);
    } catch (error) {
        const errors = Object.keys(error.errors).map(x => error.errors[x].message);
        return res.render('auth/register', { error: errors[0] });
    }
    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;