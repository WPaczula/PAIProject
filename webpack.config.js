const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

require.extensions['.css'] = () => {}

module.exports = env => ({
  entry: env.production
    ? {
      main: ['@babel/polyfill', path.join(__dirname, '/src/client/index.js')],
      static: ['@babel/polyfill', path.join(__dirname, '/src/static/index.js')],
    }
    : ['@babel/polyfill', path.join(__dirname, '/src/client/index.js')],
  output: {
    path: path.join(__dirname, '/build'),
    filename: env.production ? '[name]/bundle.js' : 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.css'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react'],
            ],
            /* eslint-disable global-require */
            plugins: [
              require('babel-plugin-styled-components'),
              require('@babel/plugin-proposal-class-properties'),
            ],
            /* eslint-disable */
          },
        },
      },
    ],
  },
  plugins: [
    ...(env.production ? prodPlugins : devPlugins),
    new ProgressBarPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
})

const devPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/client/index.html'),
  }),
]

const prodPlugins = [
  new CopyWebpackPlugin(
    [
      { from: path.join(__dirname, '/src/workers/sw.js'), to: path.join(__dirname, '/build')},
      { from: path.join(__dirname, '/favicon.ico'), to: path.join(__dirname, '/build')},
      { from: path.join(__dirname, '/assets'), to: path.join(__dirname, '/build/assets')},
      { from: path.join(__dirname, '/manifest.json'), to: path.join(__dirname, '/build')},
      { from: path.join(__dirname, '/src/static/error.html'), to: path.join(__dirname, '/build')},        
    ]
  )
]