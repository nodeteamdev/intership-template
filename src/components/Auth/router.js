const { Router } = require('express');
const AuthComponent = require('.');

const router = Router();
router.post('/signup', AuthComponent.signUp);
router.post('/login', AuthComponent.logIn);
router.post('/token', AuthComponent.verifyRefreshToken, AuthComponent.getTokens);
router.delete('/logout', AuthComponent.verifyAccessToken, AuthComponent.logOut);
module.exports = router;
