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
    }
};
