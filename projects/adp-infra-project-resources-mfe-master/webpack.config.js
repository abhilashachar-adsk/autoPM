const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { name, version } = require('./package.json');
const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|d.ts)?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  externals: {
    '@adsk/cfp-core/client': ['cfp', 'vendors', '@adsk/cfp-core/client@2'],
    react: ['cfp', 'vendors', 'react@18'],
    'react/jsx-runtime': ['cfp', 'vendors', 'react/jsx-runtime@18'],
    'react-dom': ['cfp', 'vendors', 'react-dom@18'],
    redux: ['cfp', 'vendors', 'Redux'],
    'redux-saga': ['cfp', 'vendors', 'ReduxSaga'],
    'react-dom/client	': ['cfp', 'vendors', 'react-dom/client@18'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'public/favicon.svg',
      inject: 'head',
      scriptLoading: 'blocking',
      template: 'public/index.html'
    }),
    new webpack.BannerPlugin({
      banner: `${name}: ${version}\n`
    }),
    new Dotenv()
  ]
};
