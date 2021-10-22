// https://create-react-app.dev/docs/proxying-api-requests-in-development/
// Solution for CORS
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://superheroapi.com',
            changeOrigin: true,
        })
    );
};