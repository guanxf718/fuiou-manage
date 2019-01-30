module.exports = {
    // ...
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/styles/index.scss";`
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.8.240:14000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    }
}