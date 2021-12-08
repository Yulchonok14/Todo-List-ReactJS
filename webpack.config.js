const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: './src/index.js',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'bundle.js',
    },
    devServer: {
      static: path.resolve(__dirname, 'public'),
      port: 9000,
      hot: 'only',
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
  };
};
