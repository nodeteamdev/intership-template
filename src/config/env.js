require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL,
  jwt: process.env.jwt,
};
