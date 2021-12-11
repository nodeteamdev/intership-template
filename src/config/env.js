require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL,
  HASH_SALT: process.env.HASH_SALT,
  JWT: {
    secret: process.env.JWT_SECRET,
    tokens: {
      access: {
        type: 'access',
        expiresIn: '2m',
      },
      refresh: {
        type: 'refresh',
        expiresIn: '3m',
      },
    },
  },
};
