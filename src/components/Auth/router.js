const { Router } = require('express');
const AuthComponent = require('./index');

const router = Router();

router.post('/register', AuthComponent.register);
router.post('/login', AuthComponent.login);
router.post('/refresh', AuthComponent.refreshToken);

module.exports = router;
