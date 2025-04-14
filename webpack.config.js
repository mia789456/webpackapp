const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { size } = require("lodash");

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (env) => {
  console.log('env', env);
  return {
    mode: "development",
    // mode: 'production',
    devtool: 'source-map',
    // entry: "./src/index.js",
    entry: {
      index: './src/index.js',
      // another: './src/another-module.js',
      // index: {
      //   import: './src/index.js',
      //   dependOn: 'shared',
      // },
      // another: {
      //   import: './src/another-module.js',
      //   dependOn: 'shared',
      // },
      // main: {
      //   import: ['./src/index.js', './src/another-module.js'],
      //   dependOn: 'shared'
      // },
      // shared: 'lodash',
    },
    devServer: {
      static: './dist',
      // Since webpack-dev-server v4.0.0, Hot Module Replacement is enabled by default.
      // hot: true,
    },
    output: {
      filename: '[name].[contenthash].js',
      // webpack-dev-server serves bundled files from the directory defined in output.path, 
      // path指定打包文件输出的 物理路径
      path: path.resolve(__dirname, "dist"),
      // publicPath指定打包资源在浏览器中的 引用路径, 比如这样设置生成的index.html中引用的js文件路径为
      // <script defer src="/assets/runtime.bundle.js">
      // 当使用webpack-dev-server时，publicPath的作用是告诉webpack-dev-server在哪个URL下将托管打包生成的资源，
      // 一般设置为/，表示打包文件将被托管在项目的根路径下。所以我们可以通过http://localhost:8080/访问
      // 但是当设置publicPath为/assets/时，打包文件将被托管在/assets/路径下，我们可以通过http://localhost:8080/assets/访问。
      // publicPath: '/',
      clean: true,
      // library: "webpackNumbers",
      // globalObject: 'this',
      // library: {
      //   name: 'webpackNumbers',
      //   type: 'umd',
      // },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Caching',
        template: './index.html',
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      // new BundleAnalyzerPlugin()
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.css$/i,
          /*
          Hot Module Replacement with CSS is actually fairly straightforward 
          with the help of the style-loader. 
          This loader uses module.hot.accept 
          behind the scenes to 
          patch <style> tags when CSS dependencies are updated.
          */
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', {
                  runtime: 'automatic',
                }] // 新增 React 预设
              ],
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            }
          }
        },
      ],
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_',
      },
      jquery: 'jquery',
    },

    optimization: {
      concatenateModules: false,
      minimize: false,
      // 启用后会在打包结果中标记未使用的导出 
      /* unused harmony export square */ 
      //如果启用terser plugin就可以根据这个标记删除掉未使用的导出
      usedExports: true,
      // webpack推荐这样做，将webpack相关的js代码放在一个单独的chunk中，这样就可以避免更新。
      // runtimeChunk: 'single',
      // splitChunks: {
      //   // 全局控制，决定对哪些类型的模块进行拆分（同步/异步/all）
      //   chunks: 'all',
      //   // maxSize: 244 * 1024,
      //   // 细粒度控制, 定义具体的拆分规则和分组策略
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendors',
      //       chunks: 'all', // 可以覆盖全局配置
      //     },
      //   },
      // },
    },
  };
}
