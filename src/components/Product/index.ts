import { Request, Response } from 'express';
import { checkResourceIsFound } from '../../helpers/restResponse';
import * as ProductService from './service';

async function findAll(_req: Request, res: Response) {
    const resources = await ProductService.findAll();

    res.status(200).json({
        data: resources,
    });
}

async function findById(req: Request, res: Response) {
    const resource = await ProductService.findById(req.params.id);
    checkResourceIsFound(resource);

    res.status(200).json({
        data: resource,
    });
}

async function create(req: Request, res: Response) {
    const resource = await ProductService.create(req.body);

    res.status(201).json({
        data: resource,
    });
}

async function updateById(req: Request, res: Response) {
    const resource = await ProductService.updateById(req.body.id, req.body);
    checkResourceIsFound(resource);

    res.status(200).json({
        data: resource,
    });
}

async function deleteById(req: Request, res: Response) {
    const resource = await ProductService.deleteById(req.body.id);
    checkResourceIsFound(resource);

    res.status(200).json({
        data: resource,
    });
}

export {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
