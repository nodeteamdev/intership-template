import { Schema, InferSchemaType } from 'mongoose';
import mongooseConnection from '../../config/connection';

const COLLECTION_NAME = 'products';
const MODEL_NAME = 'ProductModel';

const schema = new Schema(
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
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

export type Product = InferSchemaType<typeof schema> & {id: string};

export default mongooseConnection.model(MODEL_NAME, schema);
