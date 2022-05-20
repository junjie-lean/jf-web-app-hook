/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 13:22:01
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-05-20 10:02:16
 */

/**
 * webpack moduleLoader config list
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const { resolve } = require("path");
// const os = require("os");
// const { transpileModule } = require("typescript");

module.exports.setDefaultModule = function (config = {}) {
  let rules = [];
  let { mode } = config;

  const babelLoader = {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        compact: mode === "production",
        presets: [
          ["@babel/react"],
          [
            "@babel/env",
            {
              // spec: false, //是否启用更为规范的转换
              // debug: false,
              useBuiltIns: "usage", //入口文件出注入polyfill
              // useBuiltIns: "usage", //按需自动加入polyfill
              targets: {
                chrome: "64",
                ie: "11",
              },
              corejs: "3",
            },
          ],
          "@babel/preset-typescript",
        ],
        plugins: [
          [
            "@babel/plugin-proposal-decorators",
            {
              legacy: true,
            },
          ],
          ["@babel/plugin-proposal-class-properties", { loose: false }],
          ["@babel/plugin-syntax-class-properties", { loose: true }],
          [
            "import",
            {
              libraryName: "antd",
              libraryDirectory: "es",
              // style: "css"
              style: true,
            },
            "antd",
          ],
          [
            "module-resolver",
            {
              extensions: [".js", ".jsx"],
            },
          ],
          [
            "@babel/plugin-transform-modules-commonjs",
            {
              allowTopLevelThis: true,
            },
          ],
          [
            "@babel/plugin-transform-runtime",
            {
              corejs: "3",
            },
          ],
          "@babel/plugin-syntax-dynamic-import",
        ],
      },
    },
  };

  const styleLoader = {
    test: /\.(s[ac]|c)ss$/i,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: "/",
        },
      },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: { auto: true },
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          //   implementation: require("dart-sass"),
        },
      },
    ],
  };

  //内置模块
  const rowRource = {
    test: /\.(txt|svg)$/i,
    type: "asset/source",
  };

  //内置模块
  const assetResource = {
    test: /\.(png|jpg|jpeg|gif|mp4|avi|pdf)$/i,
    type: "asset/resource",
    generator: {
      filename: "static/media/[name][ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 30 * 1024,
      },
    },
  };

  const fontAsset = {
    test: /.(ttf|eot|woff|otf|woff2)$/i, // ttf|eot|svg|woff|woff2
    type: "asset/resource",
    generator: {
      filename: "static/media/[name].[ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 2 * 1024 * 1024,
      },
    },
  };

  const lessLoader = {
    test: /\.less$/i,
    use: [
      "style-loader",
      "css-loader", // translates CSS into CommonJS
      {
        loader: "less-loader", // compiles Less to CSS
        options: {
          lessOptions: {
            // modifyVars: {
            //   "primary-color": "#3bbc6e",
            //   "border-radius-base": "2px",
            // },
            javascriptEnabled: true,
          },
        },
      },
    ],
  };

  rules.push(
    rowRource,
    babelLoader,
    styleLoader,
    lessLoader,
    assetResource,
    fontAsset,
  );

  return { rules };
};
