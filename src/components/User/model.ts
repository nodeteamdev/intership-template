import { Schema, Document } from 'mongoose';
import connections from '../../config/connection';

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: 'usermodel',
    versionKey: false,
  },
);

export interface User extends Document {
  fullName: string,
  email: string,
}
export default connections.model<User>('UserModel', UserSchema);
