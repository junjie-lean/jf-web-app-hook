/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 15:41:40
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-10-18 09:22:09
 */

const path = require("path");
const openBrowser = require("react-dev-utils/openBrowser");
const port = require("./../package").port;

module.exports.setDevServer = function (defaultConfig = {}) {
  let devConfig = {
    client: {
      logging: "error",
      overlay: {
        //当出现编译报错时,把报错显示到浏览器ˇ
        errors: false,
        warnings: false,
      },
      //在浏览器中以百分比显示编译进度
      progress: true,
      //尝试重新连接客户端的次数 为true时,无限次尝试重新链接
      reconnect: 4,
    },
    compress: true, //gzip
    devMiddleware: {
      // index: true,
      // mimeTypes: { 'text/html': ['html'] },
      publicPath: "/",
      // writeToDisk:true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "*",
      "Powered-By-Jv-Fe": "true",
      "Powered-By-Rtwl-Fe": "true",
    },
    host: "0.0.0.0",
    // hot: true,
    historyApiFallback: {
      // index: '/index.html',
      disableDotRule: true,
    },

    static: {
      directory: path.join(__dirname, "..", "public"),
      // // publicPath:  path.join(__dirname, "..", "public"),
      publicPath: "/",
      serveIndex: true,
      //   watch: {
      //     poll: 3000,
      //   },
    },
    // magicHtml: true,
    // hot: "only",
    liveReload: false,
    watchFiles: {
      paths: ["src"],
      options: {
        usePolling: 3500,
      },
    },
    port: port,
    // open: ["/"],
    // proxy: {
    //   "/jwell-km-api-client": {
    //     target: "http://10.130.0.63:8086/jwell-km-api-client",
    //     bypass: (req, res, option) => {
    //       if (req.headers.accept.indexOf("html") !== -1) {
    //         console.log("Skipping proxy for browser request.");
    //         return "/index.html";
    //       }
    //     },
    //     // changeOrigin: true,
    //   },
    // },
    // onAfterSetupMiddleware: () => {
    //   console.log(`\n\n\n\tServer start up \`http://localhost:${port}\``);
    // },
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/g,
          to: "/index.html",
        },
      ],
    },
    onListening: () => {
      let url = `http://localhost:${port}`;
      openBrowser(url);
    },
  };

  return devConfig;
};
