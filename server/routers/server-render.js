const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  // 用在服务端渲染时，传入到vue-server-render中，
  // vue-server-render拿到这个后，会在上面插入属性
  // 如客户端的js、css路径
  const context = { url: ctx.path }
  try {
    const appString = await renderer.renderToString(context)

    const {title} = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
