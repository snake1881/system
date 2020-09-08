let proxyObj = {};
proxyObj["/ws"] = {
  ws: true,
  target: "ws://localhost:8081"
};
proxyObj["/"] = {
  ws: false,
  target: "http://192.168.0.106:8692",
  changeOrigin: true,
  pathRewrite: {
    "^/": ""
  }
};
module.exports = {
  devServer: {
    port: 8088,
    open: true,
    proxy: proxyObj
  }
};
