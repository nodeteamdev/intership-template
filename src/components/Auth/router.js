require('dotenv').config();

const { Router } = require('express');

const router = Router();

const {
  getUser,
  logIn,
  refreshTokens,
  deleteToken,
} = require('./index');

const { verifyToken } = require('./policy');

router.get('/posts', verifyToken, getUser);

router.post('/login', logIn);

router.post('/token', refreshTokens);

router.delete('/logout', deleteToken);

module.exports = router;
