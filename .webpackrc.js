const path = require("path");

export default {
  entry: "src/index.js",
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }]
  ],
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"]
    }
  },
  alias: {
    components: path.resolve(__dirname, "src/components/"),
    src: path.resolve(__dirname, "src/"),
    layouts: path.resolve(__dirname, "src/layouts/"),
    utils: path.resolve(__dirname, "src/utils/"),
    common: path.resolve(__dirname, "src/common/")
  },
  ignoreMomentLocale: true,
  theme: "./src/theme.js",
  html: {
    template: "./src/index.ejs"
  },
  disableDynamicImport: true,
  publicPath: "/",
  hash: true
  // proxy: {
  //   "/": {
  //     "target": "http://118.190.154.11/",
  //     "changeOrigin": true
  //   }
  // }
};
