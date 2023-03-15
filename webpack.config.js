const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    app: "./src/index.ts",
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    static: {
      directory: "./src",
      watch: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "pug-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/views/index.pug",
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: "./styles/[name].[hash].css",
    }),
  ],
  output: {
    filename: "./js/[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
  },
};
