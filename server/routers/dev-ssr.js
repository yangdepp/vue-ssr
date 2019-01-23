const Router = require('koa-router')
const axios = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')
const path = require('path')
const fs = require('fs')


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
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    // 未打包成功时，提醒用户
    ctx.body = 'just waitting...'
    return
  }
  // 拿到客户端打包的js，插入到服务端的html中
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data


  // 读出模板
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(
      bundle, {
        inject: false,
        clientManifest
      })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router