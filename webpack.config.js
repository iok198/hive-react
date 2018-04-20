var webpack = require("webpack")
var plugins = []

if (process.env.NODE_ENV == "production") {
    plugins.push(new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }))
  
    plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/,loader: 'babel-loader', exclude: /node_modules/, },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: plugins
};
