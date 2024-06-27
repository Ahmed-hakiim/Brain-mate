const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://brainmate.runasp.net',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api', // Keeps the '/api' prefix in the path
            },
            onProxyReq: function(proxyReq, req, res) {
                // Optionally, add custom headers here
                proxyReq.setHeader('Origin', 'https://brainmate.runasp.net');
            }
        })
    );
};
