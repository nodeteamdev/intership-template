const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const AuthService = require('./service');
const { JWT, MAILER } = require('../../config/credentials');

function generateTokens(user) {
  const payload = {
    userId: user.id,
    firstName: user.firstName,
  };
  return {
    accessToken: jwt.sign(payload, JWT.tokens.access.secret, { expiresIn: JWT.tokens.access.expiresIn }),
    refreshToken: jwt.sign(payload, JWT.tokens.refresh.secret, { expiresIn: JWT.tokens.refresh.expiresIn }),
  };
}

async function updateOrSaveToken(userId, token) {
  const isToken = await AuthService.searchTokenByUserId(userId);

  let result;

  if (isToken === null) {
    result = await AuthService.saveToken(userId, token);
  } else {
    await AuthService.removeRefreshToken(userId);
    result = await AuthService.saveToken(userId, token);
  }

  return result;
}

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: MAILER.service,
      auth: {
        user: MAILER.auth.user,
        pass: MAILER.auth.pass,
      },
    });

    await transporter.sendMail({
      from: MAILER.auth.user,
      to: email,
      subject,
      html,
    });

    console.info(`Email sent to ${email} has successfully`);
  } catch (error) {
    console.error(error, 'email not sent');
  }
};

module.exports = {
  generateTokens,
  updateOrSaveToken,
  sendEmail,
};
