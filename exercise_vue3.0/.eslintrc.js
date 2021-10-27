module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'
  ],
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'generator-star-spacing': 0, // 生成器函数*的前后空格
    'space-before-function-paren': [
      0, 'always'
    ], // 函数定义时括号前面要不要有空格
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'indent': ['error',
      2
    ],
    'eol-last': 0, // 文件以单一的换行符结束
    'camelcase': [
      0,
      {
        'properties': 'always'
      }
    ]
  }
}