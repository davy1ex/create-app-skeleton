const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/app/index.tsx",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", "jsx"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /\\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ],
    devServer: {
        static: "./dist",
        hot: true,
        historyApiFallback: true,
        port: 3000,
        open: true
    },
    mode: "development"
};