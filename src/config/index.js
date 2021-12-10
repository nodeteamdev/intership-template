require('dotenv').config();

module.exports = {
    refreshAge: process.env.refreshAge || 1000 * 60 * 60 * 24,
    accessAge: process.env.accessAge || 1000 * 60 * 5,
};
