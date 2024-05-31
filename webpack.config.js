const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const path = require("node:path");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    // cache: false,
    devtool: isProd ? false : "inline-source-map",
    entry: {
      ui: "./src/ui/index.tsx",
      code: "./src/plugin/index.ts",
    },
    mode: isProd ? "production" : "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|webp|svg)$/,
          use: "url-loader",
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/ui/ui.html",
        filename: "ui.html",
        chunks: ["ui"],
        cache: false,
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  };
};
