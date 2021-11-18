/*
 * @Author: junjie.lean
 * @Date: 2020-01-10 11:06:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-17 11:28:43
 */

/**
 * 启动脚本
 */

//  windows兼容:
const spawn = require('cross-spawn');

let startDevServer = spawn(
  'npx',
  ['webpack-dev-server', '--config', './config/webpack.base.config', '--color'],
  {
    env: { ...process.env },
  }
);

startDevServer.stdout.on('data', (data) => {
  console.log(data.toString());
});

startDevServer.stderr.on('data', (data) => {
  console.log(data.toString());
});

startDevServer.on('close', (code) => {
  console.log(code);
});
