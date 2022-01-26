/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 13:22:01
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-01-26 11:07:41
 */

/**
 * webpack moduleLoader config list
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { resolve } = require("path");
const os = require("os");
const { transpileModule } = require("typescript");

module.exports.setDefaultModule = function (config = {}) {
  let rules = [];
  let { mode } = config;

  const rowRouce = {
    test: /\.(txt|svg)$/i,
    type: "asset/source",
  };

  const babelLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        compact: mode === "production",
        presets: [
          //此配置如果修改，可能需要同步修改happyPack插件的配置,以优化打包构建效率
          ["@babel/react"],
          [
            "@babel/env",
            {
              // spec: false, //是否启用更为规范的转换
              // debug: false,
              useBuiltIns: "usage", //入口文件出注入polyfill
              // useBuiltIns: "usage", //按需自动加入polyfill
              targets: {
                chrome: "58",
                ie: "11",
              },
              corejs: "3",
            },
          ],
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
          //   publicPath: "/static/picture/",
          publicPath: "/",
          //   hmr: process.env.NODE_ENV === "development",
        },
      },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: { auto: true },
        },
      },
      //   {
      //     loader: "resolve-url-loader",
      //     options: {
      //       debug: true,
      //       sourceMap: transpileModule,
      //     },
      //   },
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
  const assetResource = {
    test: /\.(png|jpg|jpeg|gif|mp4|avi)$/i,
    type: "asset/resource",
    generator: {
      filename: "static/meida/[name].[contenthash].[ext]",
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
      filename: "static/meida/[name].[ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 2 * 1024 * 1024,
      },
    },
  };

  const lessLoader = {
    test: /\.less$/i,
    // include: [/[\\/]node_modules[\\/].*antd/],
    use: [
      "style-loader",
      "css-loader", // translates CSS into CommonJS
      // {
      //   loader: "postcss-loader",
      //   options: {
      //     config: {
      //       path: "./config/postcss.config.js",
      //     },
      //   },
      // },
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

  const tsLoader = {
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: /node_modules/,
    options: {},
  };

  rules.push(
    rowRouce,
    tsLoader,
    babelLoader,
    styleLoader,
    lessLoader,
    assetResource,
    fontAsset,
  );

  return { rules };
};
