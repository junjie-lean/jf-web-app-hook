/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 15:41:40
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 15:05:56
 */

/**
 * webpack dev server config  list.
 */
const path = require('path');
const openBrowser = require('react-dev-utils/openBrowser');
// const clearConsole = require("react-dev-utils/clearConsole");

const port = require('./../package').port;

module.exports.setDevServer = function (defaultConfig = {}) {
  let devConfig = {
    // ...defaultConfig,
    static: {
      directory: path.resolve(__dirname, '..', 'public'),
      watch: true,
      // watchContentBase: true,
    },
    port: port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    // watchOptions: {
    //   ignored: path.join(__dirname, '..', 'node_modules'),
    // },
    devMiddleware: {
      index: true,
      mimeTypes: { 'text/html': ['phtml'] },
      publicPath: '/public',
    },
    compress: true, //gzip
    host: '0.0.0.0',
    client: {
      logging: defaultConfig.stats || 'error',
      overlay: true,
      progress: true,
    },
    historyApiFallback: {
      disableDotRule: true,
    },
    onAfterSetupMiddleware: () => {
      setTimeout(() => {
        let url = `http://localhost:${port}`;
        // clearConsole();
        console.log(`\n\n\n\tServer start up @\`http://localhost:${port}\``);
        openBrowser(url);
      }, 0);
    },
  };

  return devConfig;
};
