const qs = require("qs");
const mockjs = require("mockjs");

const Random = mockjs.Random;
const createData = function(status = 200, pageNum = 1, pageSize = 2) {
  return {
    body: [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    createtime: "2018-04-03 06:00",
                    icon: "",
                    id: 42,
                    menulevel: 3,
                    menuname: "部门管理列表",
                    menuorder: 1,
                    menutype: 3,
                    parentid: 41,
                    permission: "sys:dept:tree",
                    remark: "",
                    router: "department",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:04",
                    icon: "",
                    id: 43,
                    menulevel: 3,
                    menuname: "编辑",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 41,
                    permission: "sys:dept:update",
                    remark: "部门修改",
                    router: "permission:department:update",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:05",
                    icon: "",
                    id: 44,
                    menulevel: 3,
                    menuname: "删除",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 41,
                    permission: "sys:dept:del",
                    remark: "删除",
                    router: "permission:department:delete",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:06",
                    icon: "",
                    id: 45,
                    menulevel: 3,
                    menuname: "新建",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 41,
                    permission: "sys:dept:save",
                    remark: "新建按钮",
                    router: "permission:department:save",
                    status: 1,
                    updatetime: ""
                  }
                ],
                createtime: "2018-04-03 06:00",
                icon: "",
                id: 41,
                menulevel: 2,
                menuname: "部门管理",
                menuorder: 0,
                menutype: 2,
                parentid: 40,
                permission: "sys:dept:tree",
                remark: "1",
                router: "department",
                status: 1,
                updatetime: ""
              },
              {
                children: [
                  {
                    children: [],
                    createtime: "2018-04-04 10:08",
                    icon: "",
                    id: 47,
                    menulevel: 3,
                    menuname: "菜单管理列表",
                    menuorder: 1,
                    menutype: 3,
                    parentid: 46,
                    permission: "sys:menu:tree",
                    remark: "",
                    router: "menumanage",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:13",
                    icon: "",
                    id: 48,
                    menulevel: 3,
                    menuname: "新建",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 46,
                    permission: "sys:menu:save",
                    remark: "新建菜单",
                    router: "permission:menumanage:save",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:14",
                    icon: "",
                    id: 49,
                    menulevel: 3,
                    menuname: "编辑",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 46,
                    permission: "sys:menu:update",
                    remark: "修改菜单",
                    router: "permission:menumanage:update",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:15",
                    icon: "",
                    id: 50,
                    menulevel: 3,
                    menuname: "删除",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 46,
                    permission: "sys:menu:del",
                    remark: "删除菜单",
                    router: "permission:menumanage:delete",
                    status: 1,
                    updatetime: ""
                  }
                ],
                createtime: "2018-04-04 10:08",
                icon: "",
                id: 46,
                menulevel: 2,
                menuname: "菜单管理",
                menuorder: 0,
                menutype: 2,
                parentid: 40,
                permission: "sys:menu:tree",
                remark: "",
                router: "menumanage",
                status: 1,
                updatetime: ""
              },
              {
                children: [
                  {
                    children: [],
                    createtime: "2018-04-04 10:15",
                    icon: "",
                    id: 52,
                    menulevel: 3,
                    menuname: "角色管理列表",
                    menuorder: 1,
                    menutype: 3,
                    parentid: 51,
                    permission: "sys:role:list",
                    remark: "",
                    router: "rolemanage",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:18",
                    icon: "",
                    id: 53,
                    menulevel: 3,
                    menuname: "新建",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 51,
                    permission: "sys:role:save",
                    remark: "新建角色",
                    router: "permission:rolemanage:save",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:19",
                    icon: "",
                    id: 54,
                    menulevel: 3,
                    menuname: "编辑",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 51,
                    permission: "sys:role:update",
                    remark: "",
                    router: "permission:rolemanage:update",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:20",
                    icon: "",
                    id: 55,
                    menulevel: 3,
                    menuname: "删除",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 51,
                    permission: "sys:role:del",
                    remark: "",
                    router: "permission:rolemanage:delete",
                    status: 1,
                    updatetime: ""
                  }
                ],
                createtime: "2018-04-04 10:15",
                icon: "",
                id: 51,
                menulevel: 2,
                menuname: "角色管理",
                menuorder: 0,
                menutype: 2,
                parentid: 40,
                permission: "sys:role:list",
                remark: "",
                router: "rolemanage",
                status: 1,
                updatetime: "2018-04-04 11:01"
              },
              {
                children: [
                  {
                    children: [],
                    createtime: "2018-04-04 10:23",
                    icon: "",
                    id: 57,
                    menulevel: 3,
                    menuname: "用户管理列表",
                    menuorder: 1,
                    menutype: 3,
                    parentid: 56,
                    permission: "sys:user:list",
                    remark: "",
                    router: "usermanage",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:24",
                    icon: "",
                    id: 58,
                    menulevel: 3,
                    menuname: "新建",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 56,
                    permission: "sys:user:save",
                    remark: "",
                    router: "permission:usermanage:save",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:25",
                    icon: "",
                    id: 59,
                    menulevel: 3,
                    menuname: "修改",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 56,
                    permission: "sys:user:update",
                    remark: "",
                    router: "permission:usermanage:update",
                    status: 1,
                    updatetime: ""
                  },
                  {
                    children: [],
                    createtime: "2018-04-04 10:25",
                    icon: "",
                    id: 60,
                    menulevel: 3,
                    menuname: "删除",
                    menuorder: 0,
                    menutype: 4,
                    parentid: 56,
                    permission: "sys:user:del",
                    remark: "",
                    router: "permission:usermanage:delete",
                    status: 1,
                    updatetime: ""
                  }
                ],
                createtime: "2018-04-04 10:23",
                icon: "",
                id: 56,
                menulevel: 2,
                menuname: "用户管理",
                menuorder: 0,
                menutype: 2,
                parentid: 40,
                permission: "sys:user:list",
                remark: "",
                router: "usermanage",
                status: 1,
                updatetime: ""
              },
              {
                children: [
                  {
                    children: [],
                    createtime: "2018-04-04 10:26",
                    icon: "",
                    id: 62,
                    menulevel: 3,
                    menuname: "系统日志列表",
                    menuorder: 1,
                    menutype: 3,
                    parentid: 61,
                    permission: "sys:log:list",
                    remark: "",
                    router: "systemlog",
                    status: 1,
                    updatetime: ""
                  }
                ],
                createtime: "2018-04-04 10:26",
                icon: "",
                id: 61,
                menulevel: 2,
                menuname: "系统日志",
                menuorder: 0,
                menutype: 2,
                parentid: 40,
                permission: "sys:log:list",
                remark: "",
                router: "systemlog",
                status: 1,
                updatetime: ""
              }
            ],
            createtime: "2018-04-03 05:50",
            icon: "setting",
            id: 40,
            menulevel: 1,
            menuname: "权限管理",
            menuorder: 0,
            menutype: 1,
            parentid: 1,
            permission: "",
            remark: "",
            router: "permission",
            status: 1,
            updatetime: "2018-04-10 02:19"
          }
        ],
        createtime: "2018-03-29 06:29",
        icon: "",
        id: 1,
        menulevel: 0,
        menuname: "顶级菜单",
        menuorder: 1,
        menutype: 1,
        parentid: 0,
        permission: "",
        remark: "",
        router: "",
        status: 1,
        updatetime: "2018-03-29 06:29"
      }
    ],
    code: 200,
    message: ""
  };
};
module.exports = {
  "GET /sys/menu/tree": function(req, res) {
    const mockData = createData();
    res.json(mockData);
  },
  "POST /sys/menu/save": function(req, res) {
    const mockData = createData();
    res.json(mockData);
  },
  "POST /sys/menu/update": function(req, res) {
    const mockData = createData();
    res.json(mockData);
  },
  "POST /sys/menu/del": function(req, res) {
    const mockData = createData();
    res.json(mockData);
  }
};
