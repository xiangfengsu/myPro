import { menuData } from 'core/common/menu';

const env = process.env.NODE_ENV;
const config = {
  env,
  title: '中后台系统脚手架',
  isLocalMenus: true,
  localMenus: menuData,
  autoLogin: false,
  hasPhoneLogin: false,
  hasTagsPage: true,
  whiteListPath: [
    {
      path: '/account/settings',
      name: '个人中心',
    },
    {
      path: '/generaltable/channelDetail/:id',
      name: '详情页',
    },
  ],
  vcodeUrl: env === 'development' ? 'http://vms.51auto.com/sys/vcode' : '/sys/vcode/',
  domain: '',
  // domain:'http://localhost:1337/182.254.132.199:9000'
};
export default config;
