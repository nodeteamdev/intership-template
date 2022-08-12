import { Router } from 'express';
import { validateParams, validateBody } from '../../middleware/validationHandler';
import asyncErrorCatcher from '../../middleware/errorHandlers/asyncErrorCatcher';
import * as UserComponent from '.';
import UserValidation from './validation';

/**
 * Express router to mount user related functions on.
 * @type {express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {...callback} middleware - Express middleware.
 */
router.get(
    '/',
    asyncErrorCatcher(UserComponent.findAll),
);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {...callback} middleware - Express middleware.
 */
router.get(
    '/:id',
    validateParams(UserValidation.findById.bind(UserValidation)),
    asyncErrorCatcher(UserComponent.findById),
);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {...callback} middleware - Express middleware.
 */
router.post(
    '/',
    validateBody(UserValidation.create.bind(UserValidation)),
    asyncErrorCatcher(UserComponent.create),
);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {...callback} middleware - Express middleware.
 */
router.put(
    '/',
    validateBody(UserValidation.updateById.bind(UserValidation)),
    asyncErrorCatcher(UserComponent.updateById),
);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {...callback} middleware - Express middleware.
 */
router.delete(
    '/',
    validateBody(UserValidation.deleteById.bind(UserValidation)),
    asyncErrorCatcher(UserComponent.deleteById),
);

export default router;
