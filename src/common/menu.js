export const menuData = [
  {
    name: "表单类型",
    icon: "book",
    path: "formItemType/formItemTypePage",
    children: [],
    menutype: 2
  },
  {
    name: "权限管理",
    icon: "setting",
    path: "permission",
    menutype: 1,
    children: [
      {
        name: "部门管理",
        path: "department",
        menutype: 2
      },
      {
        name: "菜单管理",
        path: "menumanage",
        menutype: 2
      },
      {
        name: "角色管理",
        path: "rolemanage",
        menutype: 2
      },
      {
        name: "用户管理",
        path: "usermanage",
        menutype: 2
      },
      {
        name: "系统日志",
        path: "systemlog",
        menutype: 2
      }
    ]
  },
  {
    name: "通用查询页",
    icon: "search",
    path: "generaltable",
    menutype: 1,
    children: [
      {
        name: "标准列表页",
        path: "channel",
        menutype: 2
      }
    ]
  }
];
