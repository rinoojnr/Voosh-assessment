const express = require('express');

const userContoller = require('../Controllers/user');
const passport = require('../Middleware/passport');

const router = express.Router();

router.post('/signup', userContoller.signup);
router.post('/login', userContoller.login);
router.post('/logout', userContoller.logout);

router.get('/auth/github',passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

module.exports = router;