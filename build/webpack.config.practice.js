const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')


const baseConfig = require('./webpack.config.base')
const defaultPlugins = [
  // 根据环境变量，用各种版本的vue，这样可以在开发环境提示报错信息
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
]


const devServer = {
  port: 8080,
  host: '127.0.0.1',
  // 编译中的错误显示到网页上，方便改正
  overlay: {
    errors: true,
  },
  // 为前端没有映射的地址，映射到首页
  // historyFallback: {},
  // 项目启动后自动打开浏览器
  open: true,
  // hot 功能热更新
  hot: true,
}

let config
// 根据环境做判断（开发环境和正式环境）设置一个环境变量，来标识（安装包，cross-env）

config = webpackMerge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  // devtool调试时，打开的浏览器都是写的代码，而不是编译后的代码，方便调试
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // 用vue-style-loader可以实现样式热重载
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'less-loader',
        ]
      }
    ]
  },
  devServer,
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    // 启动热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 减去一些不必要的信息
    new webpack.NoEmitOnErrorsPlugin(),
  ])
})


module.exports = config