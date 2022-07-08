const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

async function newUser(req, res, next) {
  try {
    const { error } = UserValidation.newUser(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const data = await UserService.newUser(req.body);
    res.status(201).send({
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { error } = UserValidation.getUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const id = req.params.id;
    const user = await UserService.getUser(id);

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await UserService.getUsers();

    if (!users) {
      throw new Error('Users not found');
    }

    res.status(200).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { error } = UserValidation.updateUser(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const id = req.params.id;
    const updates = Object.keys(req.body);
    const user = await UserService.updateUser(id, updates, req.body);
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { error } = UserValidation.deleteUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    res.status(200).send({
      message: result,
    });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { error } = UserValidation.loginUser(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const result = await UserService.loginUser(req.body);
    res.status(200).send({
      ...result,
      message: 'login successful',
    });
  } catch (error) {
    next(error);
  }
}

async function refreshTokenUser(req, res, next) {
  try {
    const { error } = UserValidation.refreshTokenUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const id = req.params.id;
    const tokens = await UserService.refreshTokenUser(id);
    res.status(200).send({
      data: tokens,
      message: 'Refresh token successful',
    });
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    const { error } = UserValidation.logoutUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const id = req.params.id;
    const result = await UserService.logoutUser(id);
    res.status(200).send({
      message: result,
    });
  } catch (error) {
    next(error);
  }
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
