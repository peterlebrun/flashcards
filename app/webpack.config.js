const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        pathRewrite: {'^/api' : ''},
      }
    },
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Flashcards',
      template: 'src/index.html',
    }),
  ],
};
