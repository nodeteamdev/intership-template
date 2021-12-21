const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

module.exports = {
    mongodb: {
        url: process.env.MONGO_URI,
        databaseName: 'users_db',

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
};
