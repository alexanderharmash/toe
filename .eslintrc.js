module.exports = {
    env: {
        browser: true,
        es6: true
    },
    plugins: ['import'],
    extends: ['airbnb-base', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    'rules': {
    }
};