const { createProxyMiddleware } = require('http-proxy-middleware');

function buildProxy(target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path) => path.replace(/^\/api\/v1/, ''),
    onError: (_err, _req, res) => {
      res.status(502).json({ message: 'Upstream service unavailable' });
    }
  });
}

module.exports = { buildProxy };
