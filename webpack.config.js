const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    mode: 'production',
    entry: './client/index.js',
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },

    //Loaders
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
            },
        ],
      },
  };