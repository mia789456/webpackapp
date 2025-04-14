### 开启react组件HMR需要的步骤
以下所有的步骤都是在webpack.config.js中进行的
1. 开启HMR功能
默认hot就是true，所以可以不配置
```
devServer: {
    static: './dist',
    // Since webpack-dev-server v4.0.0, Hot Module Replacement is enabled by default.
    hot: true,
}
```
2. 安装react-refresh还有@pmmmwh/react-refresh-webpack-plugin
```
npm install react-refresh @pmmmwh/react-refresh-webpack-plugin -D
```
3. 配置webpack.config.js
```
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react' // 新增 React 预设
                ],
                plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                }
            }
            },
        ]
    }
}
```