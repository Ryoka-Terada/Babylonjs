const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const glob = require("glob");

module.exports = {
  // src配下のtsファイルを対象とする
  entry: glob.sync("./src/**/*.ts").reduce((entries, file) => {
    const entry = path.basename(file, path.extname(file));
    entries[entry] = "./" + file;
    return entries;
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
  plugins: [
    // dist配下はビルド時にクリーン
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist")],
    }),
  ],
  mode: "development",
};
