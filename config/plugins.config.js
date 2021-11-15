/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 13:22:01
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 18:27:35
 */

/**
 * webpack plugins config list
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const package = require('./../package.json');
const CopyPlugin = require('copy-webpack-plugin');

module.exports.setDefaultPlugins = function (config = {}, defaultPlugin = []) {
  let plugins = [...defaultPlugin];
  let { debugLevel, mode, isOpenAnalyze } = config;

  if (mode === 'production') {
    //打包清空文件夹插件
    plugins.push(new CleanWebpackPlugin());
  }

  //bundleAnalyze
  if (isOpenAnalyze) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerHost: 'localhost', //unuse
        analyzerPort: '10000', //unuse
        analyzerMode: 'static',
        reportFilename: 'analyze/bundleAnalyzeReport.html',
      })
    );
  }

  //html模板插件
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'webpack-app',
      template: path.resolve(__dirname, '../public/index.html'),
    })
  );

  //copy html模板文件到build文件
  plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/*.ico'),
          to: path.resolve(__dirname, '../build/[name][ext]'),
        },
      ],
    })
  );

  if (mode !== 'development') {
    //多线程式编译模式
    plugins.push(
      new ParallelUglifyPlugin({
        sourceMap: debugLevel > 0,
        uglifyJS: {
          output: {
            comments: false,
            beautify: false,
          },
        },
      })
    );

    //打包进度可视化
    plugins.push(
      new ProgressBarPlugin({
        format:
          package.projectName +
          '  正在打包: [:bar] ' +
          chalk.green.bold(':percent') +
          ' (:elapsed seconds)',
        clear: false,
      })
    );
  }

  //css文件打包插件
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      ignoreOrder: false,
    })
  );

  return plugins;
};
