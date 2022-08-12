import { Router } from 'express';
import { validateParams, validateBody } from '../../middleware/validationHandler';
import asyncErrorCatcher from '../../middleware/errorHandlers/asyncErrorCatcher';
import * as ProductComponent from '.';
import ProductValidation from './validation';

const router = Router();

/**
 * @name /v1/products
 */
router.get(
    '/',
    asyncErrorCatcher(ProductComponent.findAll),
);

/**
 * @name /v1/products/:id
 */
router.get(
    '/:id',
    validateParams(ProductValidation.findById.bind(ProductValidation)),
    asyncErrorCatcher(ProductComponent.findById),
);

/**
 * @name /v1/products
 */
router.post(
    '/',
    validateBody(ProductValidation.create.bind(ProductValidation)),
    asyncErrorCatcher(ProductComponent.create),
);

/**
 * @name /v1/products
 */
router.put(
    '/',
    validateBody(ProductValidation.updateById.bind(ProductValidation)),
    asyncErrorCatcher(ProductComponent.updateById),
);

/**
 * @name /v1/products
 */
router.delete(
    '/',
    validateBody(ProductValidation.deleteById.bind(ProductValidation)),
    asyncErrorCatcher(ProductComponent.deleteById),
);

export default router;
