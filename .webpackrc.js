const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    src: path.resolve(__dirname, 'src/'),
    layouts: path.resolve(__dirname, 'src/layouts/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    common: path.resolve(__dirname, 'src/common/'),
    core: path.resolve(__dirname, 'src/core/'),
    pages: path.resolve(__dirname, 'src/pages/'),
  },
  ignoreMomentLocale: true,
  theme: './src/core/theme/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
  proxy: {
    '/': 'http://118.190.154.11:3000/mock/34',
  },
};
