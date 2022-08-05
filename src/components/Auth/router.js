const { Router } = require('express');
const AuthComponent = require('.');
const isAuth = require('./middleware');

const router = Router();

router
    .get('/sign-up', (req, res) => res.render('signup'));
router
    .post('/sign-up', AuthComponent.signUp);

router
    .get('/sign-in', (req, res) => res.render('signin'));
router
    .post('/sign-in', AuthComponent.signIn);

router.post('/refresh', AuthComponent.refresh);

router.delete('/logout', isAuth, AuthComponent.logout);

module.exports = router;
