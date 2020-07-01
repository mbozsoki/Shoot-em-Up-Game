const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src/index.ts"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|woff2?|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 15000 },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: ["*", ".js", ".ts"],
  },
  plugins: [
    new MiniCssExtractPlugin("style.css", { allChunks: true }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
  ],
};
