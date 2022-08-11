const ProductModel = require('./model');

async function findAll() {
    return ProductModel.find({}).exec();
}

async function findById(id) {
    return ProductModel.findById(id).exec();
}

async function create(data) {
    return ProductModel.create(data);
}

async function updateById(_id, data) {
    return ProductModel.findOneAndUpdate({ _id }, data, { new: true }).exec();
}

async function deleteById(_id) {
    return ProductModel.findOneAndDelete({ _id }).exec();
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
