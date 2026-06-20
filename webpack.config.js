const path = require('path')

const baseConfig = {
  mode: 'production',
  entry: './modules/Title.js',
  output: {
    path: path.resolve(__dirname, 'umd'),
    library: {
      name: 'ReactTitle',
      type: 'umd'
    },
    globalObject: 'this'
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types'
    }
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  }
}

module.exports = [
  {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      filename: 'ReactTitleComponent.js'
    },
    optimization: {
      minimize: false
    }
  },
  {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      filename: 'ReactTitleComponent.min.js'
    },
    optimization: {
      minimize: true
    }
  }
]
