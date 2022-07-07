const { Router } = require('express');
const TokenComponent = require('.');
const {verifyToken} = require('./service')

const router = Router();

router.post('/signUp', TokenComponent.signUp);

router.post('/logIn', TokenComponent.logIn);
router.get('/dashboard', verifyToken, TokenComponent.dashboard);

// router.post('/token', TokenComponent.getAccessToken);

// router.delete('/logOut', TokenComponent.logOut);

module.exports = router;
