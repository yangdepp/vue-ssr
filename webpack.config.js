const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 把text文件，即非js代码打包成一个单独的文件
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
  // 开发目标是web平台
  target: 'web',
  // 入口文件，path.join(__dirname)当前目录+后面行成绝对路径
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    // 输出的文件名
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|gif|jpeg|png|svg)$/,
        use: [
          {
            // 写成对象，可以对url-loader进参数c配置
            loader: 'url-loader',
            options: {
              // 把图片生成Base64代码，直接生成在js代码中，不用生成一个文件
              // 以1024K为限制，小于的就转成Base64代码
              limit: 2048,
              // name是图片原来的名字，ext是扩展名
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 根据环境变量，用各种版本的vue，这样可以在开发环境提示报错信息
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin(),
    new CleanWebpackPlugin(['dist']),
  ]
}

// 根据环境做判断（开发环境和正式环境）
// 设置一个环境变量，来标识（安装包，cross-env）
if (isDev) {
  config.module.rules.push(
    {
      test: /\.less$/,
      use: [
        'style-loader',
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

  // 调试时，打开的浏览器都是写的代码，而不是编译后的代码，方便调试
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '127.0.0.1',
    // 编译中的错误显示到网页上，方便改正
    overlay: {
      errors: true,
    },
    // 为前端没有映射的地址，映射到首页
    // historyFallback: {},
    // 项目启动后自动打开浏览器
    // open: true,
    // hot 功能热更新
    hot: true,
  }
  config.plugins.push(
    // 启动热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 减去一些不必要的信息
    new webpack.NoEmitOnErrorsPlugin(),
  )
} else {
  // 类库文件单独打包，方便做浏览器缓存
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }

  // 生产环境用chunkHash，可以保证业务代码改变，打包后不改变类库代码的hash
  config.output.filename = '[name].[chunkHash:8].js'
  // 生产环境打包时，css单独打包，并加上hash，做缓存
  config.module.rules.push({
    test: /\.less$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
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
  })
  config.plugins.push(
    // css单独打包
    new ExtractPlugin('styles.[contentHash:8].css'),

    // 类库文件单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config