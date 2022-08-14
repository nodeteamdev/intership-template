import { Schema, Document } from 'mongoose';
import connections from '../../config/connection';

const UserTokenSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    collection: 'tokenmodel',
    versionKey: false,
  },

);

export interface Token extends Document {
  userId: string,
  token: string,
}

export default connections.model<Token>('UserToken', UserTokenSchema);
