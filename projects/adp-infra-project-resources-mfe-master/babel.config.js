const coreJsCompat = require('core-js-compat');

const cfpPolyfillVendors = {
  version: require('core-js-compat/package.json').version,
  names: coreJsCompat.entries['core-js/stable']
};

module.exports = {
  'presets':
    [
      [
        '@babel/preset-env',
        {
          'corejs': require('core-js/package.json').version,
          'exclude': cfpPolyfillVendors.names,
          'useBuiltIns': 'usage'
        }
      ],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
  'plugins':
    [
      [
        '@babel/plugin-transform-runtime',
        {
          'version': require('@babel/runtime/package.json').version,
        }
      ]
    ],
  'sourceType':
    'unambiguous'
};
