module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: [
        'react',
        '@typescript-eslint/eslint-plugin',
        'import'
    ],
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        //'prettier/@typescript-eslint',
        'plugin:import/warnings'
    ],
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
        indent: ["warn", 4],
        camelcase: "warn",
    },
};
