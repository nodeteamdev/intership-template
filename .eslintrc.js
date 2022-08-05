module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        browser: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {
        indent: ['error', 4],
    },
    globals: {
        io: true,
        variables: true,
    },
};
