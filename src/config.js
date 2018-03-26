import { menuData } from './common/menu';
const config = {
  title: '中后台系统脚手架',
  defaultCollapsedSubMenu: 'formItemType',
  defaultRedirectSubMenu: '/formItemType/formItemTypePage',
  isLocalMenus: false,
  localMenus: menuData,
  autoLogin: false,
  hasPhoneLogin: false,
  detailPagePathList: [{
    key: '/generaltable/channel',
    detailPathChild: ['/generaltable/channelDetail/:id']
  }]

};
export default config;