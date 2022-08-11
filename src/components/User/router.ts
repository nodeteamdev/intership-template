import express, { Router } from 'express';
import userController from './index';
import auth from '../../middleware/auth';

const router: Router = express.Router();
// const { auth } = require('../../middleware/auth');

router.post('/register', userController.newUser);

router.get('/profile/:id', auth, userController.getUser);

router.get('/list/:id', auth, userController.getUsers);

router.put('/update/:id', auth, userController.updateUser);

router.delete('/delete/:id', auth, userController.deleteUser);

router.post('/login', userController.loginUser);

router.post('/refresh/:id', userController.refreshTokenUser);

router.get('/logout/:id', userController.logoutUser);

export default router;
