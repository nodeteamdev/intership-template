require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL,
  HASH_SALT: 3,
  JWT: {
    tokens: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        type: 'access',
        expiresIn: '2m',
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        type: 'refresh',
        expiresIn: '3m',
      },
    },
  },
};
