// index.js 就是单元测试的入口文件

// 单元测试需要用到 测试框架Mocha和 断言库assert
const path = require('path')

process.chdir(path.join(__dirname, 'smoke/template'))

describe('builder-webpack test case', () => {
  require('./unit/webpack-base-test.js')
})
