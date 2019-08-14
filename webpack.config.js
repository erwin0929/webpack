const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 这是我配置的webpack,webpack-dev-server的配置还有点瑕疵

module.exports = {

  // 入口文件
  entry: './src/index.js',

  // 输出路径,仅供于build,start模式不使用这里的js文件
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/static'),
  },

  plugins: [
    // 清理dist目录(好像有点问题)
    new CleanWebpackPlugin(),

    // 使用html模板
    new HtmlWebpackPlugin({
      title: '测试用',
      // 使用根目录下的html文件作为模板
      template: path.resolve(__dirname, 'index.html'),

      // build时输出的目录
      filename: path.resolve(__dirname, 'dist/index.html')
    })
  ],
  
  // 以下为loader配置
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
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  // webpack-dev-server的配置
  devServer: {
    port: 9000,
    open: 'Google Chrome',
  }
}

