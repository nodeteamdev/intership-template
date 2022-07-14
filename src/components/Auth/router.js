const { Router } = require('express');
const authController = require('./controller');

const router = Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/refresh-tokens', authController.refreshTokens);
router.post('/logout', authController.logOut);

module.exports = router;