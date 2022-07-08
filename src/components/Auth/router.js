const AuthComponent = require('.');
const { Router } = require('express');

const router = Router();

router.post('/sign-up', AuthComponent.signUp);
router.post('/login', AuthComponent.logIn);

module.exports = router;