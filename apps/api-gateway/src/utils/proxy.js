const {
  createProxyMiddleware,
  fixRequestBody,
} = require('http-proxy-middleware');

const normalizeBasePath = (value) => {
  if (!value || value === '/') {
    return '/';
  }

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.endsWith('/')
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
};

const createPathRewrite = (sourceBasePath, targetBasePath) => {
  const normalizedSourceBasePath = normalizeBasePath(sourceBasePath);
  const normalizedTargetBasePath = normalizeBasePath(targetBasePath);

  return (path, req) => {
    const originalUrl = req.originalUrl || path;
    const [originalPath, query = ''] = originalUrl.split('?');
    const fallbackPath = path.split('?')[0];

    const suffix = originalPath.startsWith(normalizedSourceBasePath)
      ? originalPath.slice(normalizedSourceBasePath.length)
      : fallbackPath;

    const rewrittenPath = `${normalizedTargetBasePath}${suffix}`.replace(
      /\/{2,}/g,
      '/'
    );

    return query ? `${rewrittenPath}?${query}` : rewrittenPath;
  };
};

const buildProxy = (target, sourceBasePath, targetBasePath) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: createPathRewrite(sourceBasePath, targetBasePath),
    timeout: 30000,
    proxyTimeout: 30000,
    on: {
      proxyReq(proxyReq, req) {
        fixRequestBody(proxyReq, req);
        console.log(
          `Proxying ${req.method} ${req.originalUrl} -> ${target}${proxyReq.path}`
        );
      },
      error(err, req, res) {
        console.error(`Proxy error for ${req.originalUrl}:`, err.message);
        if (!res.headersSent) {
          res.status(502).json({
            message: 'Bad gateway',
            error: err.message,
          });
        }
      },
    },
  });

module.exports = { buildProxy };
