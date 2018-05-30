'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const utils = require('./utils.js')

module.exports = {
  entry: './src/index.js',
  output: {
    path: utils.resolve('dist'),
    filename:'static/js/[name]_[hash:6].js',
    publicPath: './'
  },
  // 路径相关
  resolve: {
    // 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src')
    },
    // 扩展 后缀名 (尽量少)
    extensions: ['.js', '.vue', '.css', 'jsx', 'json'],
    modules: ['node_modules'],
    mainFiles: ['index']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: [utils.resolve('src')],
        loader: 'babel-loader',
        exclude: ['node_modules']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: 'static/',
        ignore: ['.*', 'favicon.ico', 'index.html']
      }, // 顾名思义，from 配置来源，to 配置目标路径
      {
        from: 'public/favicon.ico',
        to: 'favicon.ico'
      }
    ])
  ]
}
