// const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleWare = require('webpack-hot-middleware')

const reload = require('reload')
const http = require('http')

const app = express()
const config = require('./webpack.config.dev.js')

// const DIST_DIR = path.join(__dirname, 'build') // 设置静态访问文件路径

const compiler = webpack(config)

// app.use(express.static(DIST_DIR))

const server = http.createServer(app)
reload(server, app)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
)

app.use(hotMiddleWare(compiler))

server.listen(3000, () => {
  console.log('Example app listen on port 3000 /n')
})
