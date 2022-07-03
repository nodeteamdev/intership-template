const { Router } = require('express');
const AuthComponent = require('.');
const isAuth = require('./middleware');

const router = Router();

router.post('/sign-up', AuthComponent.signUp);

router.post('/sign-in', AuthComponent.signIn);

router.post('/refresh', AuthComponent.refresh);

router.delete('/logout', isAuth, AuthComponent.logout);

module.exports = router;
