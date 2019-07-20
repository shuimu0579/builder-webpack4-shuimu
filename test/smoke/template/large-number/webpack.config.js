const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'large-number': './src/index.js', // 开发版不压缩
    'large-number.min': './src/index.js', // 线上版压缩
  },
  output: {
    filename: '[name].js', // 输出的文件名
    library: 'largeNumber', // 指定库的全局变量  相当于 windows
    libraryTarget: 'umd', // 支持库的引入方式
    libraryExport: 'default', // 不加上 default 的话，以后引入的时候 总是需要largeNumber.default， 显然不如直接 largeNumber 方便
  },
  mode: 'none', // 清除一切的 默认加载插件， 不能设置为 development 和 production
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 使用TerserPlugin这个插件 压缩 带有 .min 的文件
        include: /\.min\.js$/,
      }),
    ],
  },
}
