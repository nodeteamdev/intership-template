const { Router } = require('express');
const TokenComponent = require('.');
const { verifyToken, verifyRefreshToken } = require('./service');

const router = Router();
router.post('/signUp', TokenComponent.signUp);
router.post('/logIn', TokenComponent.logIn);
router.post('/token', verifyRefreshToken, TokenComponent.getAccessToken);
router.delete('/logOut', verifyToken, TokenComponent.logOut);
module.exports = router;
