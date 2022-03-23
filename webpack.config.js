const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const MiniCSSExtractPlagin = require('mini-css-extract-plugin');

const nothing = () => {};

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const isAnalyze = env.analyze;

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval',
    entry: ['./src/index.js'],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '/build'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }, {
          test: /\.(sa|sc)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        }, {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlagin.loader,
            'css-loader',
          ],
        }, {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
      ],
    },
    devServer: {
      static: './src/',
      port: 9000,
    },
    plugins: [
      isProduction ? new CleanWebpackPlugin({}) : nothing,
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCSSExtractPlagin({
        filename: '[name][contenthash].css'
      }),
      isAnalyze ? new BundleAnalyzerPlugin() : nothing,
      isProduction
        ? new CopyWebpackPlugin({ patterns: [{ from: './src/assets/', to: 'assets' }] })
        : nothing,
    ],
  };
};
