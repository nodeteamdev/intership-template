require('dotenv').config();

module.exports = {
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL,
  HASH_SALT: 3,
  TOKENS: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      type: 'access',
      expiresIn: '30m',
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      type: 'refresh',
      expiresIn: '1d',
    },
  },
  MAILER: {
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
};
