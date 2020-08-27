// 配置文档：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation
// https://github.com/DocSpring/craco-antd
const { resolve } = require('path');
const { REACT_APP_API_ROOT, REACT_APP_API_HOST } = process.env;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CracoLessPlugin = require('craco-less');
const apiMocker = require('mocker-api');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const productionGzipExtensions = ['js', 'css'];
const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
module.exports = {
  reactScriptsVersion: 'react-scripts',
  // babel: {
  //   plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  // },
  webpack: {
    alias: {
      // '@': resolve(__dirname, 'src'),
      '@': pathResolve('src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      if (IS_PRODUCTION) {
        webpackConfig.plugins.push(
          new CompressionWebpackPlugin({
            // 开启gzip压缩
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 10240,
            minRatio: 0.8,
          })
        );
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial',
            },
            elementUI: {
              name: 'chunk-antd',
              priority: 20,
              test: /[\\/]node_modules[\\/]_?antd(.*)/,
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'),
              minChunks: 3,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        };
      }
      return webpackConfig;
    },
    devServer: {
      before(app) {
        // mock数据
        apiMocker(app, resolve('./mock/index.js'));
      },
      proxy: {
        [REACT_APP_API_ROOT]: {
          target: REACT_APP_API_HOST, // 你接口的域名
          // secure: false,
          // ws: false,
          // changeOrigin: true,
          pathRewrite: {
            [`^${REACT_APP_API_ROOT}`]: '', // 需要rewrite的,即真实的服务器地址中是否包含api_root
          },
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@theme': '#1DA57A' },
            javascriptEnabled: true,
          },
          prependData: '@import "@/assets/style/_global.less";',
        },
      },
    },
  ],
};
