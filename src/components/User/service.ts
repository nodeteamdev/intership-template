import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import UserModel from './models/user.model';
import RefreshModel from './models/refresh.model';
import {
  newUserInterface, loginUserInterface, payloadInterface, userModelInterface,
} from './interfaces/user.interfaces';

async function newUser(userInfo: newUserInterface): Promise<userModelInterface> {
  const {
    firstname, lastname, email, password,
  } = userInfo;
  const user: userModelInterface = await UserModel.user.findOne({ email });

  if (user) {
    throw new Error('User already exists');
  }

  const newUser: userModelInterface = new UserModel.user({
    firstname, lastname, email, password,
  });

  await newUser.save();

  const payload: payloadInterface = {
    accessToken: '',
    refreshToken: '',
    _id: newUser._id,
    firstname: newUser.firstname,
  };
  const refresh = new RefreshModel.refresh({
    ...payload,
  });
  await refresh.save();

  return {
    data: newUser,
    tokens: refresh,
  };
}

async function getUser(id: string): Promise<userModelInterface> {
  const user: userModelInterface = await UserModel.user.findById({ _id: id });
  return user;
}

async function getUsers(): Promise<userModelInterface[]> {
  const users: Array<userModelInterface> = await UserModel.user.find({});
  return users;
}

async function updateUser(id: string, updates: object, body: object): Promise<userModelInterface> {
  const user: userModelInterface = await UserModel.user.findById({ _id: id }).exec();
  const refresh = await RefreshModel.refresh.findById({ _id: id }).exec();
  refresh.firstname = body.firstname;
  updates.forEach((update) => {
    user[update] = body[update];
  });
  await refresh.save();
  await user.save();
  return user;
}

async function deleteUser(id: string): Promise<string> {
  const user: userModelInterface = await UserModel.user.findById({ _id: id }).exec();
  const refresh = await RefreshModel.refresh.findById({ _id: id }).exec();
  if (!user) {
    throw new Error('User not found');
  }
  await user.remove();
  await refresh.remove();
  return 'User deleted';
}

async function loginUser(body: loginUserInterface): Promise<object> {
  const { email, password } = body;
  const user: userModelInterface = await UserModel.user.findOne({ email }).exec();
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch: boolean = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect Password, Try again!');
  }
  const refresh = await RefreshModel.refresh.findById({ _id: user.id }).exec();
  await refresh.generateAuthToken();
  await refresh.generateRefreshToken();
  await refresh.save();
  return { data: user, tokens: refresh };
}

async function refreshTokenUser(id: string) {
  const tokens = await RefreshModel.refresh.findById({ _id: id }).exec();
  if (!tokens.refreshToken) {
    throw new Error('No refresh token provided');
  }
  await jwt.verify(tokens.refreshToken, process.env.REFRESH_TOKEN_SECRET);
  await tokens.generateAuthToken();
  await tokens.save();
  return tokens;
}

async function logoutUser(id: string): Promise<string> {
  const user: userModelInterface = await UserModel.user.findOne({ _id: id }).exec();
  const tokens = await RefreshModel.refresh.findById({ _id: id }).exec();
  if (!user) {
    throw new Error('User not found');
  }
  tokens.accessToken = '';
  tokens.refreshToken = '';
  await tokens.save();
  return 'Logout successful';
}

export default {
  newUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  refreshTokenUser,
  logoutUser,
};
