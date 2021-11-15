/*
 * @Author: junjie.lean
 * @Date: 2019-12-24 11:02:57
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2020-03-11 16:51:19
 */

/**
 *  recompile project and create an analyze file.
 */
// const { spawnSync } = require("child_process");

const spawn = require("cross-spawn");

const { writeFileSync } = require("fs");
//webpack complie start:

let webpackCompile = spawn.sync(
  "npx",
  [
    "webpack",
    "--config",
    "./config/webpack.base.config",
    "--profile",
    "--json"
  ],
  {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024, //20M
    env: {
      ...process.env
    }
  }
);

// console.log("webpack compile end!");
// console.log(webpackCompile.stdout);
// let writeJsonFile = writeFileSync("stats.json", webpackCompile.stdout);
// spawn.sync(
//   "npx",
//   [
//     "webpack-bundle-analyzer",
//     "stats.json",
//     "build",
//     "-m",
//     "static",
//     "-r",
//     "build/analyze.html",
//     "-l",
//     "debug"
//   ],
//   { encoding: "utf8" }
// );
