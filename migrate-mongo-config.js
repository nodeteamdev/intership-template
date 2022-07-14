require('dotenv').config();

const config = {
    mongodb: {
        url: process.env.MONGODB_URL,

        databaseName: process.env.MONGODB_NAME,

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    migrationsDir: 'migrations',

    changelogCollectionName: 'changelog',

    migrationFileExtension: '.js',

    useFileHash: false,

    moduleSystem: 'commonjs',
};

module.exports = config;
