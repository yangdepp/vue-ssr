const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const createVueLoaderOptions = require('./vue-loader.config')


const config = {
  // 开发目标是web平台
  target: 'web',
  // 入口文件，path.join(__dirname)当前目录+后面行成绝对路径
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    // 输出的文件名
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev),
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
              limit: 1024,
              // name是图片原来的名字，ext是扩展名
              name: 'resources/[path][name].[hash8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 每次打包都删除dist目录
    new CleanWebpackPlugin(['dist']),
  ]
}

module.exports = config