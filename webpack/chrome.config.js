const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "production",
    entry: {
        background: path.resolve(__dirname, "..", "src", "chrome", "background.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist/chrome"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/chrome/manifest.json", to: "manifest.json" },
            ],
        }),
    ],

};
