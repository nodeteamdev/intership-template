require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL,
  JWT_ACCESS_SECRET: process.env.jwt_access,
  JWT_REFRESH_SECRET: process.env.jwt_refresh,
};
