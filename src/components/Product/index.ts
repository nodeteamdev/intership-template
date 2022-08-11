const { checkResourceIsFound } = require('../../helpers/restResponse');
const ProductService = require('./service');

async function findAll(_req, res) {
    const resources = await ProductService.findAll();

    res.status(200).json({
        data: resources,
    });
}

async function findById(req, res) {
    const resource = await ProductService.findById(req.params.id);
    checkResourceIsFound(resource);

    res.status(200).json({
        data: resource,
    });
}

async function create(req, res) {
    const resource = await ProductService.create(req.body);

    res.status(201).json({
        data: resource,
    });
}

async function updateById(req, res) {
    const resource = await ProductService.updateById(req.body.id, req.body);
    checkResourceIsFound(resource);

    res.status(200).json({
        data: resource,
    });
}

async function deleteById(req, res) {
    const resource = await ProductService.deleteById(req.body.id);
    checkResourceIsFound(resource);

    res.status(200).json({
        data: resource,
    });
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
