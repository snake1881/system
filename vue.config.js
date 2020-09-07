let proxyObj = {};
proxyObj["/ws"] = {
  ws: true,
  target: "ws://localhost:8081"
};
proxyObj["/"] = {
  ws: false,
<<<<<<< HEAD
  target: "http://192.168.0.189:8692/demo",
=======
  target: "http://192.168.0.106:8692",
>>>>>>> a5967d3b2211eb71f5b802b3bf57652d74b375a4
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
