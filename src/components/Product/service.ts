import ProductModel, { Product } from './model';

async function findAll() {
    return ProductModel.find({}).exec();
}

async function findById(id: string) {
    return ProductModel.findById(id).exec();
}

async function create(data: Product) {
    return ProductModel.create(data);
}

async function updateById(id: string, data: Product) {
    return ProductModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec();
}

async function deleteById(id: string) {
    return ProductModel.findOneAndDelete({ _id: id }).exec();
}

export {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
