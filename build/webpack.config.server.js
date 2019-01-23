const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base')

const vueServerPlugin = require('vue-server-renderer/server-plugin')


let config
// 根据环境做判断（开发环境和正式环境）设置一个环境变量，来标识（安装包，cross-env）

config = webpackMerge(baseConfig, {
  // 指定打包的环境
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  // devtool调试时，打开的浏览器都是写的代码，而不是编译后的代码，方便调试
  devtool: '#source-map',
  output: {
    // 打包的模块类型
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build'),
    // node环境可以直接require
    externals: Object.keys(require('../package.json').dependencies),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractPlugin.extract({
          // 用vue-style-loader可以实现样式热重载
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'less-loader',
          ]
        })
      }
    ]
  },
  plugins: [
    // css单独打包
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new vueServerPlugin()
  ]
})


module.exports = config
