module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {
        indent: ['error', 4],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['migrations/*'] }],
    },
};
