'use strict'

const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const baseConfig = require('./base.js')
const config = require('../config/index.js')
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
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
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
    }
  },
  plugins: [
    // 作用域提升 减少代码量
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: config.assetsSubDirectory + '/css/[name].css',
      allChunks: true
    }),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        mangle: false,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    })
  ]
})
