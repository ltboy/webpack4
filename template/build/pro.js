'use strict'

const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 打包优化 分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const baseConfig = require('./base.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    // 代码分割
    // minSize (default: 30000) 块的最小大小
    // minChunks (default: 1) 拆分前共享一个模块的最小块数
    // maxInitialRequests (default 3) 一个入口最大并行请求数
    // maxAsyncRequests (default 5) 按需加载时最大行行请求数
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial', //通过chunks选项可以选择块，有3个值："initial"、"async"和"all"。分别用于选择初始块、按需加载的块和所有块。
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 1024
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

    // runtimeChunk:true,
    // 代码压缩丑化
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
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // 作用域提升 减少代码量
    new CleanWebpackPlugin('dist', {
      dry: false,
      root: path.resolve(__dirname, '..')
    }),
    // 作用域提升 减小打包体积
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin()
  ]
})
