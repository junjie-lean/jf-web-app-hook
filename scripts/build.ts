/*
 * @Author: junjie.lean
 * @Date: 2020-06-17 16:51:24
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-04-21 13:50:07
 */

const spawn = require("cross-spawn");
const zipper = require("zip-local");
const chalk = require("chalk");
const package = require("./../package");
const fs = require("fs");

process.on("unhandledRejection", (err) => {
  throw err;
});

let option = {
  env: {
    ...process.env,
  },
  cwd: process.cwd(),
  stdio: "inherit",
  encoding: "utf8",
  shell: process.platform == "win32",
};

console.log(chalk.hex("#00d684").bold("Build start, please wait..."));

let res = spawn.sync(
  "npx",
  ["webpack", "--config", "./config/webpack.base.config"],
  {
    ...option,
  }
);

console.log(chalk.hex("#00d684").bold("Zip start, please wait..."));

let hash = "";
for (let i = 0; i < 10; i++) {
  hash += Math.floor(Math.random() * 16).toString(16);
}

let zipName = `build${
  package.projectName ? "." + package.projectName : ""
}.${hash}.zip`;

if (fs.existsSync("./build")) {
  zipper.sync.zip("./build").compress().save(zipName);
  console.log(
    chalk.hex("#00d684").bold(`Zip completed, package name: "${zipName}"`)
  );
}
