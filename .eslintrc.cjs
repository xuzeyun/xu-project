/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    // 避免index文件名报错
    "vue/multi-word-component-names": "off"
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
