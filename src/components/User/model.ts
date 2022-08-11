import { Schema } from 'mongoose';
import connections from '../../config/connection';

interface IUser extends Document {
    fullName: string;
    email: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        collection: 'usermodel',
        versionKey: false,
    }
);

export default connections.model<IUser>('UserModel', userSchema);
