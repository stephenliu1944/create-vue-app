module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    // js 类型用 @babel/eslint-parser 解析, 解决 export default from 报错问题.
    sourceType: 'module',
    parser: '@babel/eslint-parser'
    // parser: '@typescript-eslint/parser',
  },
  extends: [
    'eslint:recommended', 
    'plugin:vue/recommended'
  ],
  rules: {
    'no-cond-assign': 'error',
    'no-constant-condition': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty': 'warn',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-obj-calls': 'error',
    'no-regex-spaces': 'error',
    'no-sparse-arrays': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-else-return': 'error',
    'no-empty-pattern': 'error',
    'no-redeclare': 'error',
    'no-delete-var': 'error',
    'no-lonely-if': 'error',
    'no-self-assign': 'error',
    'no-multiple-empty-lines': ['warn', { 'max': 1 }],
    'space-infix-ops': 'error',
    'spaced-comment': 'warn',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'comma-dangle': 'error',
    'semi': 'error',
    'semi-spacing': 'error',
    'key-spacing': 'error',
    'curly': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'accessor-pairs': 'error',
    'eqeqeq': 'error',
    'radix': 'error',
    'quotes': ['error', 'single'],
    'indent': ['warn', 2, { 'SwitchCase': 1, 'MemberExpression': 1, 'ignoredNodes': ['TemplateLiteral'] }],
    'keyword-spacing': 'error',
    'arrow-spacing': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    /* vue 配置 */ 
    'vue/no-mutating-props': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/order-in-components': 'off',
    'vue/prop-name-casing': 'off',
    'vue/no-v-html': 'off',
    'vue/no-template-shadow': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/component-definition-name-casing': 'off'
  }
};