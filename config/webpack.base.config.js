/*
 * @Author: junjie.lean
 * @Date: 2019-12-19 13:33:20
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 15:13:29
 */

/**
 *  webpack base config,do not change any config if you not know how it works;
 */
const path = require('path');
const { setDefaultModule } = require('./module.config.js');
const { setDevServer } = require('./webpack.dev.config.js');
const { setDefaultPlugins } = require('./plugins.config.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

/** mode */
const mode =
  process.env.NODE_ENV !== 'production' ? 'development' : 'production';

/**
 * debugLevel 调试等级,输出等级. 0 到 4.
 * 0不输出sourceMap, 打包速度最快;
 * 4输出详细sourceMap,打包构建速度最慢;
 * 不建议修改
 */
const debugLevel = mode === 'production' ? 0 : 4;

/** 是否是bundle分析模式,用来分析bundle依赖是否有问题. */
const isOpenAnalyze =
  process.env.ANALYZE_MODE && process.env.ANALYZE_MODE === 'true';

/** 是否启用打包分析模式,用来分析打包过慢的原因 */
const isMeasure = process.env.MEASURE && process.env.MEASURE === 'true';

const smp = new SpeedMeasurePlugin({
  disable: !isMeasure,
});

const projectName = require('./../package.json').projectName;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/* 输出的source-map设置 */
function setSourceMapAbout(debugLevel) {
  let stats, devtool;
  switch (debugLevel) {
    case 1: {
      devtool = 'cheap-module-eval-source-map';
      stats = 'error';
      break;
    }
    case 2: {
      devtool = 'module-source-map';
      stats = 'info';
      break;
    }
    case 3: {
      devtool = 'evel-source-map';
      stats = 'log';
      break;
    }
    case 4: {
      devtool = 'eval-source-map';
      stats = 'verbose';
      break;
    }
    default: {
      devtool = 'eval';
      stats = 'none';
    }
  }
  return { devtool, stats };
}

let config = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename:
      mode == 'production'
        ? 'static/js/index.[name].[contenthash].js' //index.js
        : 'static/js/dev.[name].index.js', //dev.b.js
    chunkFilename:
      mode == 'production'
        ? 'static/js/chunk/[name].[contenthash].js' //c.main.hash.js
        : 'static/js/chunk/dev.[name].js', //dev.c.main.js
    publicPath: './',
  },
  devtool: setSourceMapAbout(debugLevel).devtool,
  stats: {
    assets: false,
    //忽略ts导入文件是全名检测的警告
    warningsFilter: /export .* was not found in/,
  },
  module: setDefaultModule({ debugLevel, mode }),
  plugins: setDefaultPlugins({ debugLevel, mode, isOpenAnalyze }),
  devServer: setDevServer({ stats: setSourceMapAbout(debugLevel).stats }),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json'],
  },
  // performance: {
  //   hints: false,
  // },
  ...(mode === 'production'
    ? {
        optimization: {
          minimizer: [new CssMinimizerPlugin()],
          moduleIds: 'deterministic', //打包时关键性依赖包不重新更新hash,比如react这些...
          runtimeChunk: 'single', //为所有chunk 创建一个runtime bundle,而不是每一个文件一个verdors
          splitChunks: {
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/](react|react-dom|antd|lodash|moment|@ant-design|core-js|react-router|react-router-dom|core-js-pure)[\\/]/,
                name: 'static',
                chunks: 'all',
              },
            },
          },
        },
      }
    : {}),
};

module.exports = config;
