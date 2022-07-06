const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('./model');

exports.newUser = async (req, res, next) => {
  try {
    const {
      firstname, lastname, email, password,
    } = req.body;

    const user = await UserModel.User.findOne({ email });

    if (user) {
      return res.status(400).send({
        message: 'User already exists',
      });
    }

    const newUser = new UserModel.User({
      firstname,
      lastname,
      email,
      password,
    });

    await newUser.save();

    const payload = {
      accessToken: '',
      refreshToken: '',
      _id: newUser._id,
      firstname: newUser.firstname,
    };
    const refresh = new UserModel.Refresh({
      ...payload,
    });
    await refresh.save();

    res.status(201).send({
      data: newUser,
      tokens: refresh,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      error: error.message,
    });
    next(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params._id;

    const user = await UserModel.User.findById({ _id: id });
    const refresh = await UserModel.Refresh.findById({ _id: id }).exec();

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    res.status(200).send({
      data: user,
      tokens: refresh,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.User.find({});

    if (!users) {
      return res.status(404).send({
        message: 'No users found',
      });
    }

    res.status(200).send({
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params._id;

    const updates = Object.keys(req.body);

    const user = await UserModel.User.findById({ _id: id }).exec();

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params._id;

    const user = await UserModel.User.findById({ _id: id }).exec();
    const refresh = await UserModel.Refresh.findById({ _id: id }).exec();

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    await user.remove();
    await refresh.remove();

    res.status(200).send({
      message: 'User deleted',
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).send({
        message: 'User not found',
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: 'Incorrect Password, Try again!',
      });
    }

    const refresh = await UserModel.Refresh.findById({ _id: user.id }).exec();
    await refresh.generateAuthToken();
    await refresh.generateRefreshToken();
    await refresh.save();

    res.status(200).send({
      data: user,
      tokens: refresh,
      message: 'login successful',
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

exports.refreshTokenUser = async (req, res) => {
  try {
    const id = req.params._id;
    const tokens = await UserModel.Refresh.findById({ _id: id }).exec();
    if (!tokens.refreshToken) {
      return res.status(401).send({
        message: 'No refresh token provided',
      });
    }
    await jwt.verify(tokens.refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await tokens.generateAuthToken();
    await tokens.save();
    res.status(200).send({
      data: tokens,
      message: 'Refresh token successful',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await UserModel.User.findOne({ _id: id }).exec();
    const tokens = await UserModel.Refresh.findById({ _id: id }).exec();

    if (!user) {
      return res.status(401).send({
        message: 'User not found',
      });
    }

    tokens.accessToken = '';
    tokens.refreshToken = '';
    await tokens.save();

    res.status(200).send({
      message: 'Logout successful',
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};
