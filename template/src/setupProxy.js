const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://eshop.test.zaina8.com/',
      target: 'http://192.168.1.75:8000/',
      changeOrigin: true,
    })
  );
};
