import * as jwt from 'jsonwebtoken';
import UserToken from './token.model';

const accessKey: string = 'ACCESS_TOKEN_PRIVATE_KEY';
const refreshKey: string = 'REFRESH_TOKEN_PRIVATE_KEY';

async function generateAccessToken(userId: string) {
  const payload: object = { userId };
  const accessToken: string = jwt.sign(
    payload,
    accessKey,
    { expiresIn: '5m' },
  );
  return accessToken;
}

async function generateRefreshToken(id: string) {
  const payload: object = { id };
  const refreshToken: string = jwt.sign(
    payload,
    refreshKey,
    { expiresIn: '1h' },
  );
  const oldRefreshToken: Promise<String> = await UserToken.findOne({ userId: id }).exec();
  if (oldRefreshToken === null) {
    await UserToken.create({ userId: id, token: refreshToken }).exec();
  } else {
    await UserToken.updateOne({ id }, { token: refreshToken }).exec();
  }
  return refreshToken;
}

async function decodeAccessToken(token: string) {
  const decoded = await jwt.verify(token, accessKey);
  return decoded;
}

async function decodeRefreshToken(token: string) {
  const decoded = await jwt.verify(token, refreshKey);
  // const [userId] = decoded;
  return decoded;
}

export default {
  generateAccessToken,
  generateRefreshToken,
  decodeAccessToken,
  decodeRefreshToken,
};
