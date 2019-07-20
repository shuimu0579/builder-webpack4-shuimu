const cssnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
  plugins: [
    // css 代码压缩
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // 公共资源包的提取
    new HtmlWebpackExternalsPlugin({
      // 将react react-dom 等基础包 分离，并以 CDN 的形式 在index.html 和 search.html 里面引入
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  // 提取一些公共的包， 只要复用达到了minChunks: 2  两次的话，就把它们提取成公共的包
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  // 如果不走上面 HtmlWebpackExternalsPlugin   CDN 提取公共包的话，就可以用下面这种方式 提取公共的源代码
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /(react|react-dom)/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
};

module.exports = merge(baseConfig, prodConfig);
