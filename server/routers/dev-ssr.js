const Router = require('koa-router')
const axios = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const vueServerRender = require('vue-server-renderer')
const path = require('path')


const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (error, stats) => {
  if (error) throw error
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverCompiler.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

const handleSSR = async (ctx) => {
  if (bundle) {
    ctx.body = '等一会'
    return
  } else {

  }
}
