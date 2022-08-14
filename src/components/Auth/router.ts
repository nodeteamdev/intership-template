import { Router } from 'express';
import AuthComponent from './index';

const router: Router = Router();
router.post('/signup', AuthComponent.signUp);
router.post('/login', AuthComponent.logIn);
router.post('/token', AuthComponent.verifyRefreshToken, AuthComponent.getTokens);
router.delete('/logout', AuthComponent.verifyAccessToken, AuthComponent.logOut);
export default router;
