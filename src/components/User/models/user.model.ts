import bcryptjs from 'bcryptjs';
import { Schema } from 'mongoose';
import connections from '../../../config/connection';
import { userSchemaInterface, userModelInterface } from '../interfaces/user.interfaces';

const UserSchema = new Schema<userSchemaInterface>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 12);
  }
  next();
});

const user: userModelInterface = connections.model<userSchemaInterface, userModelInterface>('user', UserSchema);
export default {
  user,
};
