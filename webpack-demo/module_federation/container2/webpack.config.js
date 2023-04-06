const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const deps = require("./package.json").dependencies;
const buildDate = new Date().toLocaleString();
require("dotenv").config({ path: "./.env" });

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: "./src/index.tsx",
        mode: process.env.NODE_ENV || "development",
        devServer: {
            port: 3000,
            open: true,
            headers: { "Access-Control-Allow-Origin": "*" },
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                "@babel/preset-env",
                                { targets: { browsers: "last 2 versions" } },
                            ],
                            "@babel/preset-typescript",
                            "@babel/preset-react",
                        ],
                        plugins: [
                            "react-hot-loader/babel",
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            [
                                "@babel/plugin-proposal-private-property-in-object",
                                { loose: true },
                            ],
                            ["@babel/plugin-proposal-private-methods", { loose: true }],
                        ],
                    },
                },
            ],
        },
        plugins: [
            new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
            new webpack.DefinePlugin({ "process.env": JSON.stringify(process.env) }),

            new HtmlWebpackPlugin({ template: "./public/index.html" }),
            new ForkTsCheckerWebpackPlugin(),
        ],
    };
};
