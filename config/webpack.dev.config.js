/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 15:41:40
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 10:40:52
 */

/**
 * webpack dev server config  list.
 * 2021年11月15日16:01:20
 * 升级至webpack v5
 */

const path = require('path');
const openBrowser = require('react-dev-utils/openBrowser');
const port = require('./../package').port;

module.exports.setDevServer = function (defaultConfig = {}) {
  let devConfig = {
    client: {
      logging: defaultConfig.stats || 'error',
      overlay: {
        //当出现编译报错时,把报错显示到浏览器ˇ
        errors: true,
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
      publicPath: '/',
      // writeToDisk:true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*',
      'Powered-By-Jvfe': 'true',
    },
    host: '0.0.0.0',
    // hot: true,
    historyApiFallback: {
      // index: '/index.html',
      disableDotRule: true,
    },
    static: {
      directory: path.join(__dirname, '..', 'public'),
      // // publicPath:  path.join(__dirname, "..", "public"),
      publicPath: '/',
      serveIndex: true,
      watch: { 
        poll: 3000,
      },
    },
    // magicHtml: true,
    // watchFiles: {
    //   paths: ['src/**/*'],
    //   options: {
    //     usePolling: 3000,
    //   },
    // },
    port: port,
    onAfterSetupMiddleware: () => {
      console.log(`\n\n\n\tServer start up \`http://localhost:${port}\``);
    },
    onListening: () => {
      let url = `http://localhost:${port}`;
      openBrowser(url);
    },
  };

  return devConfig;
};
