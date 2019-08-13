const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/static')
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '测试用',
      template: path.resolve(__dirname, 'index.html'),
      filename: path.resolve(__dirname, 'dist/index.html')
    })
  ],
  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader'},
          { 
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: 'static/images/'
            }
          },
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }],
      }
    ]
  }
}