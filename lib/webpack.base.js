const path = require('path')
const glob = require('glob')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const projectRoot = process.cwd() // process.cwd() 设定为当前目录

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'))

  console.log(entryFiles)
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]
    // '/Users/cpselvis/my-project/src/index/index.js'

    const match = entryFile.match(/src\/(.*)\/index\.js/) // 获取到
    console.log('match', match)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        // chunks: ['vendors', pageName],
        chunks: ['commons', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins,
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  module: {
    rules: [
      // eslint强制执行
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },

      // babel 解析 ES6 和 JSX 语法
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      //
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },

      // 解析加载css scss less 等文件
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 记得在根目录下配置上postcss.config.js文件
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 记得在根目录下配置上postcss.config.js文件
          'sass-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 记得在根目录下配置上postcss.config.js文件
          'less-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },

      // 解析图片
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader', // 为什么这里file-loader和webpack.config.dev.js里面 url-loader不相同呢？
            options: {
              limit: 10240, // 10kb以上的就会解析成为base64格式的文件
              name: '[name][hash:8].[ext]',
            },
          },
        ],
      },

      // 解析字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 清理输出目录
    new CleanWebpackPlugin(),
    // 将css单独提取出一个文件出来
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    // 构建错误友好提示
    new FriendlyErrorsWebpackPlugin(),
    // 下面这个 用于构建报错 的方法 在webpack4里面已经内置了，但是在webpack4以下就没有配置，就需要配置这个方法，打印出错误
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors
          && stats.compilation.errors.length
          && process.argv.indexOf('--watch') === -1
        ) {
          console.log('build error')
          process.exit(1)
        }
      })
    },
    // webpack4以下的写法 ,构建报错显示
    // function() {
    //   this.plugin('done', stats => {
    //     if (
    //       stats.compilation.errors &&
    //       stats.compilation.errors.length &&
    //       process.argv.indexOf('--watch') == -1
    //     ) {
    //       console.log('build error')
    //       process.exit(1)
    //     }
    //   })
    // },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
}
