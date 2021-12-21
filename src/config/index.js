require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    saltRounds: 10,
    mailAge: process.env.MAILAGE || 60 * 5,
    refreshAge: process.env.REFRESHAGE || 60 * 60 * 24,
    accessAge: process.env.ACCESSAGE || 60 * 5,
    gmail: process.env.GMAIL || 'your_gmail@gmail.com',
    gpass: process.env.GPASS || 'your_password',
    hostname: process.env.HOSTNAME || 'localhost',
};
