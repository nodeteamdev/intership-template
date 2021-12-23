const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BooksSchema = new Schema(
    {
        code3: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        // timestamps: {
        //     createdAt: 'created_at',
        //     updatedAt: 'updated_at',
        // },
        // created_at: { type: Date, required: true, default: Date.now },

    },
    {
        collection: 'books',
        versionKey: false,
    },
    // timestamps: {
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at',
    // }
    { timestamps: true },
);

module.exports = connections.model('BookModel', BooksSchema);
