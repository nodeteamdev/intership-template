const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const UserModel = require('./models/user.model');
const RefreshModel = require('./models/refresh.model');

async function newUser(userInfo) {
  const {
    firstname, lastname, email, password,
  } = userInfo;
  const user = await UserModel.user.findOne({ email });

  if (user) {
    throw new Error('User already exists');
  }
  const viewedBooks = [];
  const newUser = new UserModel.user({
    firstname, lastname, email, password, viewedBooks,
  });

  await newUser.save();

  const payload = {
    accessToken: '',
    refreshToken: '',
    _id: newUser._id,
    firstname: newUser.firstname,
  };
  const refresh = new RefreshModel.refresh({
    ...payload,
  });
  await refresh.save();
  console.log(newUser);
  const data = {
    data: newUser,
    tokens: refresh,
  };

  return data;
}

async function getUser(id) {
  const user = await UserModel.user.findById({ _id: id });
  return user;
}

async function getUsers() {
  const users = await UserModel.user.find({});
  return users;
}

async function updateUser(id, updates, body) {
  const user = await UserModel.user.findById({ _id: id }).exec();
  const refresh = await RefreshModel.refresh.findById({ _id: id }).exec();
  refresh.firstname = body.firstname;
  updates.forEach((update) => {
    user[update] = body[update];
  });
  await refresh.save();
  await user.save();
  return user;
}

async function deleteUser(id) {
  const user = await UserModel.user.findById({ _id: id }).exec();
  const refresh = await RefreshModel.refresh.findById({ _id: id }).exec();
  if (!user) {
    throw new Error('User not found');
  }
  await user.remove();
  await refresh.remove();
  return 'User deleted';
}

async function loginUser(body) {
  const { email, password } = body;
  const user = await UserModel.user.findOne({ email }).exec();
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect Password, Try again!');
  }
  const refresh = await RefreshModel.refresh.findById({ _id: user.id }).exec();
  await refresh.generateAuthToken();
  await refresh.generateRefreshToken();
  await refresh.save();
  return { data: user, tokens: refresh };
}

async function refreshTokenUser(id) {
  const tokens = await RefreshModel.refresh.findById({ _id: id }).exec();
  if (!tokens.refreshToken) {
    throw new Error('No refresh token provided');
  }
  await jwt.verify(tokens.refreshToken, process.env.REFRESH_TOKEN_SECRET);
  await tokens.generateAuthToken();
  await tokens.save();
  return tokens;
}

async function logoutUser(id) {
  const user = await UserModel.user.findOne({ _id: id }).exec();
  const tokens = await RefreshModel.refresh.findById({ _id: id }).exec();
  if (!user) {
    throw new Error('User not found');
  }
  tokens.accessToken = '';
  tokens.refreshToken = '';
  await tokens.save();
  return 'Logout successful';
}

module.exports = {
  newUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  refreshTokenUser,
  logoutUser,
};
