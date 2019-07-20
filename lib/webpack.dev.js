const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  // 多文件打包
  plugins: [
    // webpack 热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ],
  // devServer: {
  //   port: '3000',
  //   contentBase: './build',
  //   hot: true,
  //   stats: 'errors-only'  //如果利用了devServer，就在这里面配置
  // }
  devtool: 'source-map', // 在浏览器调试 Sources 里面， 这个很有用。。。
};

module.exports = merge(baseConfig, devConfig);
