const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/admin/v1',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  )
}
