import { Router } from 'express';
import asyncErrorCatcher from '../../middleware/errorHandlers/asyncErrorCatcher';
import * as BookComponent from '.';

const router = Router();

/**
 * @name /v1/books/count-per-country
 */
router.get(
    '/count-per-country',
    asyncErrorCatcher(BookComponent.getCountPerCountry),
);

/**
 * @name /v1/books/new-books
 */
router.get(
    '/new-books',
    asyncErrorCatcher(BookComponent.getNewBooks),
);

export default router;
