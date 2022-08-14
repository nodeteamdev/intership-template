import { Schema, Document } from 'mongoose';
import connections from '../../config/connection';

export interface IUser extends Document {
  fullName: string;
  email: string;
}

const UserSchema = new Schema<IUser>(
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
    collection: 'usermodel',
    versionKey: false,
  },
);

export default connections.model('UserModel', UserSchema);
