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

### Tree Shaking
1. webpack.config.js配置如下：
```
mode: 'development',
optimization: {
    // true的话会开启TerserPlugin，删除被标记为未使用的导出，也就是标有unused harmony export
    minimize: false,
    // 启用后会在打包结果中标记未使用的导出 
    /* unused harmony export square */ 
    usedExports: true,
},
```
2. 入口index.js文件
```
import { cube } from './math.js';
import { add } from '@mia789456/child' 
console.log('start index.js')
cube(5)
```
math.js文件有cube和square两个方法，这里只导入了cube，square被标记了/* unused harmony export square */
@mia789456/child暴露了add和subtract方法，两个方法都被标记/* unused harmony exports add, subtract */

如果设置 @mia789456/child的package.json的sideEffects为false，其他都保持不变之后重新打包，会发现打包出来的结果中根本就没有引入@mia789456/child的任何代码，所以如果开发一个库的话，如果没有副作用，一定记得设置sideEffects为false，这样可以减少webpack打包的体积。