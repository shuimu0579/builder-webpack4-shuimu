const path = require('path')
const webpack = require('webpack')
// 每次在构建之前，都要删掉 dist库，用到rimraf库
const rimraf = require('rimraf')
// 写 测试用例 的库
const Mocha = require('mocha')

// 实例化一个Mocha对象，并设置一个超时时间10s
const mocha = new Mocha({
  timeout: '10000ms',
})

process.chdir(path.join(__dirname, 'template')) // process.chdir 进入template 文件里，不然路径会有一些问题

rimraf('./dist', () => {
  // 引入配置
  const prodConfig = require('../../lib/webpack.prod.js')
  // 运行配置
  webpack(prodConfig, (err, stats) => {
    // 失败时候的状态
    if (err) {
      console.error(err)
      process.exit(2)
    }
    // 成功时候的状态
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
      })
    )

    console.log('Webpack build success, begin run test.')
    // 通过mocha的addFile()来讲编写好的用例 html-test.js、css-js-test.js 引入进来
    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))
    mocha.run()
  })
})
