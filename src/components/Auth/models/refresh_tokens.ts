import { Schema, InferSchemaType } from 'mongoose';
import mongooseConnection from '../../../config/connection';

const COLLECTION_NAME = 'refresh_tokens';
const MODEL_NAME = 'RefreshTokenModel';

const schema = new Schema(
    {
        authUserId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

export type RefreshToken = InferSchemaType<typeof schema> & {id: string};

export default mongooseConnection.model(MODEL_NAME, schema);
