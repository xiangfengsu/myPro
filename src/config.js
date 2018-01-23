import { menuData } from './common/fetchMenu.js';
const config = {
  title: '中后台系统脚手架',
  isLocalMenus: true,
  localMenus: menuData,
  autoLogin: false,
  hasPhoneLogin: false,
  detailPagePathList: [{
    key: '/generaltable/channel',
    detailPathChild: ['/generaltable/channelDetail/:id']
  }]

};
export default config;