const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlagin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const jsLoaders = () =>{
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]
  if(isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: [ '@babel/polyfill', './index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
        
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    devtool: isDev ? 'source-map' : false,

    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: isDev,
      port: 8080,
  },
  

  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",

    plugins: [
      
        new CleanWebpackPlugin(),
        new HTMLWebpackPlagin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src/favicon.ico'), to: "dist" },
            ],
          }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                },
              "css-loader",
              "sass-loader",
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders()


          }
        ],
      },
}