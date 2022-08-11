import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import connections from '../../../config/connection';
import { refreshSchemaInterface, refreshModelInterface } from '../interfaces/user.interfaces';

const { JWT_SECRET } = process.env;

const { REFRESH_TOKEN_SECRET } = process.env;

const RefreshSchema = new Schema<refreshSchemaInterface>({
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  _id: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
}, { timestamps: true });

RefreshSchema.pre('save', async (next) => {
  const refresh = this;
  next();
});

RefreshSchema.methods.generateAuthToken = function () {
  const obj = this;
  const secret = JWT_SECRET;
  const token = jwt.sign({ _id: obj._id }, secret, {
    expiresIn: '2m',
  });
  obj.accessToken = token;
};

RefreshSchema.methods.generateRefreshToken = function () {
  const obj = this;
  const secret = REFRESH_TOKEN_SECRET;
  const refreshToken = jwt.sign({ _id: obj._id }, secret, {
    expiresIn: '10m',
  });
  obj.refreshToken = refreshToken;
};

const refresh: refreshModelInterface = connections.model<refreshSchemaInterface, refreshModelInterface>('refresh', RefreshSchema);
export default {
  refresh,
};
