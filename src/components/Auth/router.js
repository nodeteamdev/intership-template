require('dotenv').config();

const { Router } = require('express');

const router = Router();

const {
  verifyToken,
  getUser,
  getTokens,
  getRefreshToken,
  deleteToken,
} = require('./index');

router.get('/posts', verifyToken, getUser);

router.post('/login', getTokens);

router.post('/token', getRefreshToken);

router.delete('/logout', deleteToken);

module.exports = router;
