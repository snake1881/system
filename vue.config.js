let proxyObj = {};
proxyObj["/ws"] = {
    ws: true,
    target: "ws://localhost:8081"
};
proxyObj["/"] = {
    ws: false,
    target: "http://192.168.0.185:8080",
    // target: "http://192.168.0.171:8692",
    changeOrigin: true,
    pathRewrite: {
        "^/": ""
    }
};
module.exports = {
    lintOnSave: "warning",
    devServer: {
        port: 8088,
        open: true,
        proxy: proxyObj
    },
};