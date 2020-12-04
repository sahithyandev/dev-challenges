const path = require("path");
const { ESBuildPlugin } = require("esbuild-loader");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              tsconfigRaw: require("./tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          { loader: "style-loader", options: { injectType: "linkTag" } },
          "file-loader",
        ],
      },
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new ESBuildPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 3000,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
