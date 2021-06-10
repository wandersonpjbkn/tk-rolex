module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [ 'plugin:vue/recommended', '@vue/standard' ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'template-curly-spacing': [ 'error', 'never' ],
    'vue/html-closing-bracket-newline': [ 'error', { multiline: 'never' } ],
    'vue/multiline-html-element-content-newline': [ 'error', { allowEmptyLines: true } ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
