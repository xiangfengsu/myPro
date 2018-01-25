import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {};
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function (file) {
  if (file.indexOf('.js') !== -1) {
    Object.assign(proxy, require('./mock/' + file))
  }

})
export default noProxy ? {} : delay(proxy, 500);
