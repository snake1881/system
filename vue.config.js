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
  target: "http://192.168.0.106:8692/demo",
>>>>>>> 0c72a1c8383cb5b1e2e14332ca9b14451ec66b26
  changeOrigin: true,
  pathRewrite: {
    "^/": ""
  }
};
module.exports = {
  devServer: {
    host: "localhost",
    port: 8088,
    open: true,
    proxy: proxyObj
  }
};
