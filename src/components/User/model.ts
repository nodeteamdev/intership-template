import { Schema, InferSchemaType } from 'mongoose';
import mongooseConnection from '../../config/connection';

const COLLECTION_NAME = 'usermodel';
const MODEL_NAME = 'UserModel';

const schema = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

export type User = InferSchemaType<typeof schema> & {id: string};

export default mongooseConnection.model(MODEL_NAME, schema);
