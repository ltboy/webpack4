'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const utils = require('./utils.js')
const baseConfig = require('./base.js')

const HOST = 'localhost'
const PORT = 8088

module.exports = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${HOST}:${PORT}`],
        clearConsole: true
      }
    })
  ],
  // server
  devServer: {
    hot: true,
    // 配置webpack编译好的静态文件
    publicPath: '/',
    // 配置的是那些不经过webpack编译的静态文件
    // contentBase: 'dist',
    compress: true,
    host: '0.0.0.0',
    port: PORT,
    // open: true,
    overlay: { warnings: false, errors: true },
    quiet: true,
    watchOptions: {
      poll: true
    }
  }
})
