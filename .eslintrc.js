module.exports = {
  root: true,
  plugins: ['eslint-plugin-cypress'],
  extends: ['react-native-typescript', 'plugin:cypress/recommended'],
  env: { 'cypress/globals': true },
  rules: {
    semi: ['error', 'always'],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
      },
    ],
  },
};
