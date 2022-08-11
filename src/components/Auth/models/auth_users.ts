import { Types, Schema, InferSchemaType } from 'mongoose';
import mongooseConnection from '../../../config/connection';

const COLLECTION_NAME = 'auth_users';
const MODEL_NAME = 'AuthUserModel';

const schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

export type AuthUser = InferSchemaType<typeof schema>
    & {id: Types.ObjectId | string}
    & {_id: Types.ObjectId | string};

export default mongooseConnection.model(MODEL_NAME, schema);
