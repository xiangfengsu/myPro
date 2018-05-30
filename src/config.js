import { menuData } from "./common/menu";

const config = {
  title: "中后台系统脚手架",
  isLocalMenus: true,
  localMenus: menuData,
  autoLogin: false,
  hasPhoneLogin: false,
  hasTagsPage: true,
  whiteListPath: [
    {
      path: "/account/settings",
      name: "个人中心"
    },
    {
      path: "/generaltable/channelDetail/:id",
      name: "详情页"
    }
  ],
  vcodeUrl: "http://newfhmcar.chunlvbank.com/FHM_car300/code.do", // ${config.domain}/sys/vcode
  domain: ""
  // domain:'http://localhost:1337/182.254.132.199:9000'
};
export default config;
