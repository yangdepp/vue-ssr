const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
// 把text文件，即非js代码打包成一个单独的文件
const ExtractPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base')
const defaultPlugins = [
  // 根据环境变量，用各种版本的vue，这样可以在开发环境提示报错信息
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
]


const devServer = {
  port: 8000,
  host: '127.0.0.1',
  // 编译中的错误显示到网页上，方便改正
  overlay: {
    errors: true,
  },
  // 为前端没有映射的地址，映射到首页
  historyApiFallback: {
    index: '/index.html'
  },
  // 项目启动后自动打开浏览器
  open: true,
  // hot 功能热更新
  hot: true,
}

let config
// 根据环境做判断（开发环境和正式环境）设置一个环境变量，来标识（安装包，cross-env）
if (isDev) {
  config = webpackMerge(baseConfig, {
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
    plugins: defaultPlugins.concat([
      // 启动热更新插件
      new webpack.HotModuleReplacementPlugin(),
      // 减去一些不必要的信息
      new webpack.NoEmitOnErrorsPlugin(),
    ])
  })
} else {
  config = webpackMerge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // 类库文件单独打包，方便做浏览器缓存
      vendor: ['vue']
    },
    output: {
      // 生产环境用chunkHash，可以保证业务代码改变，打包后不改变类库代码的hash
      filename: '[name].[chunkHash:8].js'
    },
    module: {
      // 生产环境打包时，css单独打包，并加上hash，做缓存
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
    plugins: defaultPlugins.concat([
      // css单独打包
      new ExtractPlugin('styles.[contentHash:8].css'),

      // 类库文件单独打包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
