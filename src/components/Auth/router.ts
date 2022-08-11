import { Router } from 'express';
import asyncErrorCatcher from '../../middleware/errorHandlers/asyncErrorCatcher';
import * as AuthComponent from '.';
import AuthValidation from './validation';
import { validateBody } from '../../middleware/validationHandler';

/**
 * Express router to mount auth related functions on.
 * @type {express.Router}
 * @const
 */
const router = Router();

/**
 * @name /v1/auth/register
 */
router.post(
    '/register',
    validateBody(AuthValidation.create.bind(AuthValidation)),
    asyncErrorCatcher(AuthComponent.registerUsingEmailAndPassword),
);

/**
 * @name /v1/auth/login
 */
router.post(
    '/login',
    validateBody(AuthValidation.create.bind(AuthValidation)),
    asyncErrorCatcher(AuthComponent.loginUsingEmailAndPassword),
);

/**
 * @name /v1/auth/token
 */
router.post(
    '/token',
    validateBody(AuthValidation.refreshToken.bind(AuthValidation)),
    asyncErrorCatcher(AuthComponent.getNewAccessAndRefreshToken),
);

/**
 * @name /v1/auth/logout
 */
router.post(
    '/logout',
    validateBody(AuthValidation.refreshToken.bind(AuthValidation)),
    asyncErrorCatcher(AuthComponent.removeRefreshToken),
);

/**
 * @name /v1/auth/logout-everywhere
 */
router.post(
    '/logout-everywhere',
    validateBody(AuthValidation.create.bind(AuthValidation)),
    asyncErrorCatcher(AuthComponent.removeAllRefreshTokens),
);

export default router;
