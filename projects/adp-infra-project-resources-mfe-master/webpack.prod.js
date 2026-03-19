const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const base = require('./webpack.config.js');

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      overrideConfig: {
        rules: {
          'react/jsx-one-expression-per-line': 'off',
          'react/require-default-props': 'off',
        }
      }
    }),

  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            passes: 2,
          },
        },
      })
    ]
  },
  output: {
    publicPath: 'auto'
  }
});
