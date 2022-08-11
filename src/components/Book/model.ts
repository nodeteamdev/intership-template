import { Schema, InferSchemaType } from 'mongoose';
import mongooseConnection from '../../config/connection';

const COLLECTION_NAME = 'books';
const MODEL_NAME = 'BookModel';

const schema = new Schema(
    {
        code3: {
            // country code
            type: String,
            trim: true,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
        versionKey: false,
    },
);

export type Book = InferSchemaType<typeof schema> & {id: string};

export default mongooseConnection.model(MODEL_NAME, schema);
