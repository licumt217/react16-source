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
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'vue/comment-directive': 'off',
        'no-useless-escape': 'off',
        'no-constant-condition': 'off',
        'no-prototype-builtins': 'off',
        'vue/multi-word-component-names': 'off',//组件名称要求大驼峰，且不能用系统常用的名称
    }


}
