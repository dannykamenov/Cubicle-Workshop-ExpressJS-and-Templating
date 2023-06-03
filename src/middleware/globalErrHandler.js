const errorHandler = (err, req, res, next) => {
    if (err) {
        if (err.message === 'Invalid username or password!') {
            return res.render('auth/login', { error: err.message });
        } else if (err.message === 'User already exists!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'Passwords don\'t match!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'You are not the creator of this cube!') {
            return res.render('404', { error: err.message });
        } else if (err.message === 'Invalid data!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'Invalid data!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'Invalid data!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'Invalid data!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'Invalid data!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'Invalid data!') {
            return res.render('auth/register', { error: err.message });
        } else if (err.message === 'Invalid data!') {
            return res.render('auth/register', { error: err.message });
        }
    }
    next();
};

module.exports = errorHandler;