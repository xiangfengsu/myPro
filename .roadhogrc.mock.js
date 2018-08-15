import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {};
require('fs')
  .readdirSync(require('path').join(__dirname + '/mock'))
  .forEach(function(file) {
    if (file.indexOf('.js') !== -1) {
      Object.assign(proxy, require('./mock/' + file));
    }
  });
const noProxyAddress = {
  'GET /*': 'http://118.190.154.11:3000/mock/34/',
  'POST /*': 'http://118.190.154.11:3000/mock/34/',
  'PUT /*': 'http://118.190.154.11:3000/mock/34/',
  'DELETE /*': 'http://118.190.154.11:3000/mock/34/',
};
// export default (true ? {} : delay(proxy, 500));
export default noProxyAddress;
