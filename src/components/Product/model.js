const { Schema } = require('mongoose');
const mongooseConnection = require('../../config/connection');

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'products',
        versionKey: false,
    },
);

module.exports = mongooseConnection.model('ProductModel', ProductSchema);
