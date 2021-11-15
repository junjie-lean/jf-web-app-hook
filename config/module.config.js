/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 13:22:01
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 15:11:21
 */

/**
 * webpack moduleLoader config list
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { resolve } = require('path');
const os = require('os');

module.exports.setDefaultModule = function (config = {}, loaderArr = []) {
  let rules = [...loaderArr];
  let { mode } = config;

  const rawLoader = {
    test: /\.(txt|svg)$/i,
    use: 'raw-loader',
    // include: resolve(__dirname, "..", "src"),
  };

  const babelLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: false,
        compact: mode === 'production',
        presets: [
          //此配置如果修改，可能需要同步修改happyPack插件的配置,以优化打包构建效率
          ['@babel/react'],
          [
            '@babel/env',
            {
              // spec: false, //是否启用更为规范的转换
              // debug: false,
              useBuiltIns: 'usage', //入口文件出注入polyfill
              // useBuiltIns: "usage", //按需自动加入polyfill
              targets: {
                chrome: '58',
                ie: '11',
              },
              corejs: '3',
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true,
            },
          ],
          ['@babel/plugin-proposal-class-properties', { loose: false }],
          ['@babel/plugin-syntax-class-properties', { loose: true }],
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              // style: "css"
              style: true,
            },
            'antd',
          ],
          [
            'module-resolver',
            {
              extensions: ['.js', '.jsx'],
            },
          ],
          [
            '@babel/plugin-transform-modules-commonjs',
            {
              allowTopLevelThis: true,
            },
          ],
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: '3',
            },
          ],
          '@babel/plugin-syntax-dynamic-import',
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
          publicPath: '../../',
        },
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: { auto: true },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: require('dart-sass'),
        },
      },
    ],
  };

  const fileLoader = {
    test: /\.(mp4|avi)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'media',
        },
      },
    ],
    include: resolve(__dirname, '..', 'src'),
  };

  const urlLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024 * 700, //unit:byte,under this value to transform to base64 code.
          name: '[name].[contenthash].[ext]',
          outputPath: 'media',
          esModule: false,
        },
      },
    ],
    include: resolve(__dirname, '..', 'src'),
  };

  const fontLoader = {
    test: /.(ttf|eot|woff|otf|woff2)$/i, // ttf|eot|svg|woff|woff2
    use: [
      {
        loader: 'url-loader',
        options: {
          // name: '[name].[hash:8].[ext]',
          limit: 1000 * 1024,
          name: '[name].[ext]',
          outputPath: 'font',
        },
      },
    ],
    include: resolve(__dirname, '..', 'src'),
  };

  const lessLoader = {
    test: /\.less$/i,
    // include: [/[\\/]node_modules[\\/].*antd/],
    use: [
      'style-loader',
      'css-loader', // translates CSS into CommonJS
      // {
      //   loader: "postcss-loader",
      //   options: {
      //     config: {
      //       path: "./config/postcss.config.js",
      //     },
      //   },
      // },
      {
        loader: 'less-loader', // compiles Less to CSS
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

  const markdownLoader = {
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader',
      },
      {
        loader: 'markdown-loader',
      },
    ],
  };

  const happypackLoader = {
    test: /.jsx?$/,
    use: 'happypack/loader?id=happyPackerJs',
    exclude: /node_modules/,
  };

  const tsLoader = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {},
  };

  rules.push(
    // svgrLoader,
    tsLoader,
    babelLoader,
    styleLoader,
    lessLoader,
    rawLoader,
    urlLoader,
    fileLoader,
    fontLoader
    // markdownLoader,
    // happypackLoader
  );

  return { rules };
};
