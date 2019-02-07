const path = require("path");

const appRootPath = path.join(__dirname);

// Phaser webpack config
const phaserModule = path.join(appRootPath, "/node_modules/phaser-ce/")
const phaser = path.join(phaserModule, "build/custom/phaser-split.js")
const pixi = path.join(phaserModule, "build/custom/pixi.js")
const p2 = path.join(phaserModule, "build/custom/p2.js")

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: path.resolve(appRootPath, "index.js"),
        vendor: ["pixi", "p2", "phaser"]
    },
    output: {
        path: path.resolve(appRootPath, "dist/"),
        filename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /pixi\.js/,
                use: {
                    loader: "expose-loader",
                    query: "PIXI"
                }
            },
            {
                test: /phaser-split\.js$/,
                use: {
                    loader: "expose-loader",
                    query: "Phaser"
                }
            },
            {
                test: /p2\.js/,
                use: {
                    loader: "expose-loader",
                    query: "p2"
                }
            }
        ]
    },
    resolve: {
        alias: {
            phaser: phaser,
            pixi: pixi,
            p2: p2
        }
    }
}