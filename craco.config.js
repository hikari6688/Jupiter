// 配置文档：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation
// https://github.com/DocSpring/craco-antd
const { resolve } = require('path');
const { REACT_APP_API_ROOT, REACT_APP_API_HOST } = process.env;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const productionGzipExtensions = ['js', 'css'];
const path = require('path');
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
module.exports = {
  reactScriptsVersion: 'react-scripts',
  webpack: {
    alias: {
      '@': pathResolve('src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      if (IS_PRODUCTION) {
        webpackConfig.plugins.push(
          new CompressionWebpackPlugin({
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
      proxy: {
        [REACT_APP_API_ROOT]: {
          target: REACT_APP_API_HOST,
          // secure: false,
          // ws: false,
          // changeOrigin: true,
          pathRewrite: {
            [`^${REACT_APP_API_ROOT}`]: '',
          },
        },
      },
    },
  },
  plugins: [],
};
