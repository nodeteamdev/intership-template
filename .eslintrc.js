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
        'no-underscore-dangle': 0,
        'newline-before-return': 2,
        indent: ['error', 4, { SwitchCase: 1 }],
    },
};
