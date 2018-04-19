import { menuData } from './common/menu';
const config = {
  title: '中后台系统脚手架',
  defaultCollapsedSubMenu: 'formItemType',
  defaultRedirectSubMenu: '/formItemType/formItemTypePage',
  isLocalMenus: true,
  localMenus: menuData,
  autoLogin: false,
  hasPhoneLogin: false,
  hasTagsPage:true,
  detailPagePathList: [{
    key: '/generaltable/channel',
    detailPathChild: ['/generaltable/channelDetail/:id']
  }],
  domain:''
};
export default config;