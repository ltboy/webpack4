'use strict'

const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base.js')
module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true
                  }
                },
                'postcss-loader'
              ],
              publicPath: '../',
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true
                  }
                },
                'postcss-loader',
                'sass-loader'
              ],
              publicPath: '../',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'postcss-loader'
          ],
          publicPath: '../',
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ],
          publicPath: '../',
          fallback: 'vue-style-loader'
        })
      }
    ]
  },
  optimization: {
    // 代码分割
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    // 代码压缩丑化
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: true, // 删除warnings
            drop_console: true // 删除console
          },
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    // 作用域提升 减少代码量
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
  ]
})
