const { Router } = require('express');
const AuthComponent = require('./index');
const PasswordComponent = require('./restPassword/passwordReset');

const router = Router();

router.post('/register', AuthComponent.register);
router.post('/login', AuthComponent.login);
router.get('/password-reset/:refreshToken', PasswordComponent.renderResetPassword);
router.post('/password-confirm', PasswordComponent.confirmPassword);
router.post('/refresh', AuthComponent.refreshToken);
router.post('/password', PasswordComponent.password);

module.exports = router;
