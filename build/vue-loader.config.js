module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,  //vue中的css单独打包到一个文件
    cssModules: {},
    //  hotReload: false,  //对于vue的热重载关闭,根据环境变量生成
  }
}