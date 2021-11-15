/*
 * @Author: junjie.lean
 * @Date: 2020-01-10 11:06:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-04-21 15:44:58
 */

/**
 * 启动脚本
 */

//  windows兼容:
const spawn = require("cross-spawn");
// const {spawn} = require("child_process")
// console.log(process.env.NODE_ENV)
// webpack-dev-server --config ./config/webpack.base.config --color

let startDevServer = spawn(
  "npx",
  ["webpack-dev-server", "--config", "./config/webpack.base.config", "--color"],
  {
    env: { ...process.env },
  }
);

startDevServer.stdout.on("data", (data) => {
  console.log("stdout:", data.toString());
});

startDevServer.stderr.on("data", (data) => {
  console.log("error:", data.toString());
});

startDevServer.on("close", (code) => {
  console.log(code);
});
