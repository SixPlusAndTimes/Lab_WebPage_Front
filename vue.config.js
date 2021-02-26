module.exports = {
    devServer: {
        // proxy: "http://localhost:8888"
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                // ws: true,// 开启webSocket
                pathRewrite: {
                    '^/api': '',// 替换成target中的地址
                }
            },
            '/image/': {
                target: 'http://localhost:8888/image/',
                changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                // ws: true,// 开启webSocket
                pathRewrite: {
                    '^/image/': '',// 替换成target中的地址
                }
            },
            "/ImageUpload": {
                target: 'http://localhost:8888/ImageUpload',
                changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                // ws: true,// 开启webSocket
                pathRewrite: {
                    '^/ImageUpload': '',// 替换成target中的地址
                }
            }
        }
    }
}
