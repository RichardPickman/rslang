// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico'
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        // test: /\.(ts|tsx)$/i,
        // loader: 'ts-loader',
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader'

      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
    config.devtool = 'source-map'

    config.plugins.push(new MiniCssExtractPlugin())
  } else {
    config.mode = 'development'
    config.devtool = 'cheap-module-source-map'
    config.plugins.push(new ReactRefreshWebpackPlugin())
  }
  return config
}
