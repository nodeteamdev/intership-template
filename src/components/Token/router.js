const { Router } = require('express');
const TokenComponent = require('.');

const router = Router();

router.post('/signUp', TokenComponent.signUp);

module.exports = router;
