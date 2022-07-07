const { Router } = require('express');
const { validateParams, validateBody } = require('../../middleware/validationHandler');
const asyncErrorCatcher = require('../../middleware/errorHandlers/asyncErrorCatcher');
const UserComponent = require('.');
const ProductValidation = require('./validation');

const router = Router();

/**
 * @name /v1/products
 */
router.get(
    '/',
    asyncErrorCatcher(UserComponent.findAll),
);

/**
 * @name /v1/products/:id
 */
router.get(
    '/:id',
    validateParams(ProductValidation.findById.bind(ProductValidation)),
    asyncErrorCatcher(UserComponent.findById),
);

/**
 * @name /v1/products
 */
router.post(
    '/',
    validateBody(ProductValidation.create.bind(ProductValidation)),
    asyncErrorCatcher(UserComponent.create),
);

/**
 * @name /v1/products
 */
router.put(
    '/',
    validateBody(ProductValidation.updateById.bind(ProductValidation)),
    asyncErrorCatcher(UserComponent.updateById),
);

/**
 * @name /v1/products
 */
router.delete(
    '/',
    validateBody(ProductValidation.deleteById.bind(ProductValidation)),
    asyncErrorCatcher(UserComponent.deleteById),
);

module.exports = router;
