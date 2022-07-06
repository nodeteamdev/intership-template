const express = require('express');

const router = express.Router();
const userController = require('./index');
const { auth } = require('../../middleware/auth');

router.post('/register', userController.newUser);

router.get('/profile/:_id', auth, userController.getUser);

router.get('/list/:_id', auth, userController.getUsers);

router.put('/update/:_id', auth, userController.updateUser);

router.delete('/delete/:_id', auth, userController.deleteUser);

router.post('/login', userController.loginUser);

router.post('/refresh/:_id', userController.refreshTokenUser);

router.get('/logout/:_id', userController.logoutUser);

module.exports = router;
