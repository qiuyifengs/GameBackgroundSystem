module.exports = {
    '/api/': {
        target: 'http://admin2.local.com/v1', // 后端服务器
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
    },
    '/api/v1/': {
        target: 'http://nadmin.mddgame.com/v1',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/': ''
        }
    },
    '/api/v1/': {
        target: 'http://testheroadmin.mddgame.com/v1',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/': ''
        }
    },
    '/api/v1/': {
        target: 'http://rmanager.mddgame.com/v1',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/': ''
        }
    },
    '/api/v1/': {
        target: 'http://rfrontend.mddgame.com/v1',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/': ''
        }
    }
}