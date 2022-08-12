import { Request, Response } from 'express';
import * as BookService from './service';

async function getCountPerCountry(_req: Request, res: Response) {
    const resources = await BookService.getAllBooksCountPerCountry();

    res.status(200).json({
        data: resources,
    });
}

async function getNewBooks(_req: Request, res: Response) {
    const LIMIT = 15;
    const resources = await BookService.getNewBooks(LIMIT);

    res.status(200).json({
        data: resources,
    });
}

export {
    getCountPerCountry,
    getNewBooks,
};
