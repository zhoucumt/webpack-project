//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'), //必须是绝对路径
        filename: 'bundle.[hash].js',
        publicPath: '/' //通常是CDN地址
    },

    devtool: 'cheap-module-eval-source-map',

    mode: isDev ? 'development' : 'production',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/
            },

            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        }
                    },
    
                    // MiniCssExtractPlugin.loader, // 替换之前的 style-loader
                    // 'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                // return [
                                //     require('autoprefixer')({
                                //         "overrideBrowserslist": [
                                //             ">0.25%",
                                //             "not dead"
                                //         ]
                                //     })
                                // ]
                                return [require('autoprefixer')()];
                            }
                        }
                    },
                    'less-loader'],
                exclude: /node_modules/
            },

            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false,
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            },

            // {
            //     test: /.html$/,
            //     use: 'html-withimg-loader'
            // }
        ]
    },

    plugins: [
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            config: config.template
            // hash: true //是否加上hash，默认是 false
        }),

        // new CleanWebpackPlugin(),

        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
            },
            //还可以继续配置其它要拷贝的文件
        ]),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
            // 个人习惯将css文件放在单独目录下
            // publicPath:'../'
            // 如果你的output的publicPath配置的是 './' 这种相对路径，
            // 那么如果将css文件放在单独目录下，记得在这里指定一下publicPath 
        }),

        new OptimizeCssPlugin() 
    ],

    devServer: {
        port: '3002', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    }
}
