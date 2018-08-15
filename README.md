## 简介
myPro-admin是一套采用前后端分离开发模式，基于ant-design-pro的后台管理系统前端解决方案，根据实际业务场景，修改菜单权限模式。  
## 目录
```
.
├── mock     mock模拟数据
├── public   打包所需静态资源
├── src
│   ├── assets      静态资源
│   ├── components  业务组件
│   ├── config.js   开发相关配置
│   ├── core  系统核心配置  
│       ├── common 
│       ├── layouts
│       ├── service
│       ├── style
│       ├── theme
│       └── utils
│   ├── e2e   端到端测试
│   ├── pages  
│       ├── Sys   系统路由
└── tests
```
## 快速开始
 * 从github拉取最新代码
 
 ```
  git clone https://github.com/xiangfengsu/myPro.git
 ```
 然后进入项目根目录
 ```
 cd myPro
 ```
 安装依赖并运行项目
 ```
 npm install
 npm start
 ```
 然后只需要等待编译结束后其自动打开页面
 * 通过mypro-cli 命令自动创建项目 `推荐`
 
 首页全局安装mypro-cli
 ```
 npm install mypro-cli -g 
 ```
 根据命令创建项目，按提示依次输入
 ```
 myPro new
 ```
 等待下载项目模板和依赖,完成后执行
 ```
 npm start
 ```
