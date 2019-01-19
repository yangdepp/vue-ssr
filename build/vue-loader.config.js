module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,  //vue中的css单独打包到一个文件
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true,
    },
    //  hotReload: false,  //对于vue的热重载关闭,根据环境变量生成
  }
}