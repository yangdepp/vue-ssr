module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: true,  //vue中的css单独打包到一个文件
  }
}