const { Router } = require('express');
const auth = require('./auth');

const router = Router();

router.post('/signin', auth.signIn);
router.post('/refresh-tokens', auth.refreshTokens);

module.exports = router;