module.exports = {
  'GET /api/selectGroupLists': {
    status: 200,
    body: [
      {
        label: 'selectDynamicGroup1',
        key: 'selectDynamicGroup1',
        childrenOptions: [
          {
            key: 'selectDynamicGroup1_1',
            value: 'selectDynamicGroup1_1',
          },
          {
            key: 'selectDynamicGroup1_2',
            value: 'selectDynamicGroup1_2',
          },
        ],
      },
      {
        label: 'selectDynamicGroup2',
        key: 'selectDynamicGroup2',
        childrenOptions: [
          {
            key: 'selectDynamicGroup2_1',
            value: 'selectDynamicGroup2_1',
          },
          {
            key: 'selectDynamicGroup2_2 ',
            value: 'selectDynamicGroup2_2',
          },
        ],
      },
    ],
    errorMessage: '',
  },
  'GET /api/selectLists2': {
    status: 200,
    body: [
      {
        key: '广告1',
        value: '广告',
      },
      {
        key: '网络2',
        value: '网络',
      },
      {
        key: '中介3',
        value: '中介',
      },
      {
        key: '其他4',
        value: '其他',
      },
    ],
    errorMessage: '',
  },
  'GET /sys/dept/dic': {
    body: [
      {
        parentKey: 0,
        children: [
          {
            parentKey: 4,
            children: [
              {
                parentKey: 5,
                children: [],
                value: '浦东新区分公司11',
                key: 8,
              },
            ],
            value: '上海分公司131',
            key: 5,
          },
          {
            parentKey: 4,
            children: [
              {
                parentKey: 7,
                children: [],
                value: '北京分公司1',
                key: 6,
              },
            ],
            value: '重庆分公司',
            key: 7,
          },
          {
            parentKey: 4,
            children: [],
            value: '北京分公司',
            key: 9,
          },
          {
            parentKey: 4,
            children: [],
            value: '测试公司1',
            key: 10,
          },
          {
            parentKey: 4,
            children: [
              {
                parentKey: 11,
                children: [],
                value: 'tttt',
                key: 14,
              },
            ],
            value: '北京分公司',
            key: 11,
          },
          {
            parentKey: 4,
            children: [],
            value: '测试部门',
            key: 12,
          },
          {
            parentKey: 4,
            children: [],
            value: 'test111',
            key: 13,
          },
        ],
        value: '总公司',
        key: 4,
      },
    ],
    code: 200,
    message: '',
  },
  'GET /sys/menu/dic': {
    body: [
      {
        parentKey: 0,
        children: [
          {
            parentKey: 1,
            children: [
              {
                parentKey: 40,
                children: [
                  {
                    parentKey: 41,
                    children: [],
                    menutype: 3,
                    value: '部门管理列表',
                    key: 42,
                  },
                  {
                    parentKey: 41,
                    children: [],
                    menutype: 4,
                    value: '编辑',
                    key: 43,
                  },
                  {
                    parentKey: 41,
                    children: [],
                    menutype: 4,
                    value: '删除',
                    key: 44,
                  },
                  {
                    parentKey: 41,
                    children: [],
                    menutype: 4,
                    value: '新建',
                    key: 45,
                  },
                ],
                menutype: 2,
                value: '部门管理',
                key: 41,
              },
              {
                parentKey: 40,
                children: [
                  {
                    parentKey: 46,
                    children: [],
                    menutype: 3,
                    value: '菜单管理列表',
                    key: 47,
                  },
                  {
                    parentKey: 46,
                    children: [],
                    menutype: 4,
                    value: '新建',
                    key: 48,
                  },
                  {
                    parentKey: 46,
                    children: [],
                    menutype: 4,
                    value: '编辑',
                    key: 49,
                  },
                  {
                    parentKey: 46,
                    children: [],
                    menutype: 4,
                    value: '删除',
                    key: 50,
                  },
                ],
                menutype: 2,
                value: '菜单管理',
                key: 46,
              },
              {
                parentKey: 40,
                children: [
                  {
                    parentKey: 51,
                    children: [],
                    menutype: 3,
                    value: '角色管理列表',
                    key: 52,
                  },
                  {
                    parentKey: 51,
                    children: [],
                    menutype: 4,
                    value: '新建',
                    key: 53,
                  },
                  {
                    parentKey: 51,
                    children: [],
                    menutype: 4,
                    value: '编辑',
                    key: 54,
                  },
                  {
                    parentKey: 51,
                    children: [],
                    menutype: 4,
                    value: '删除',
                    key: 55,
                  },
                ],
                menutype: 2,
                value: '角色管理',
                key: 51,
              },
              {
                parentKey: 40,
                children: [
                  {
                    parentKey: 56,
                    children: [],
                    menutype: 3,
                    value: '用户管理列表',
                    key: 57,
                  },
                  {
                    parentKey: 56,
                    children: [],
                    menutype: 4,
                    value: '新建',
                    key: 58,
                  },
                  {
                    parentKey: 56,
                    children: [],
                    menutype: 4,
                    value: '修改',
                    key: 59,
                  },
                  {
                    parentKey: 56,
                    children: [],
                    menutype: 4,
                    value: '删除',
                    key: 60,
                  },
                ],
                menutype: 2,
                value: '用户管理',
                key: 56,
              },
              {
                parentKey: 40,
                children: [
                  {
                    parentKey: 61,
                    children: [],
                    menutype: 3,
                    value: '系统日志列表',
                    key: 62,
                  },
                ],
                menutype: 2,
                value: '系统日志',
                key: 61,
              },
            ],
            menutype: 1,
            value: '权限管理',
            key: 40,
          },
        ],
        menutype: 1,
        value: '顶级菜单',
        key: 1,
      },
    ],
    code: 200,
    message: '',
  },
  'GET /sys/role/dic': {
    body: [
      {
        value: 'test2',
        key: 20,
      },
      {
        value: 'test1',
        key: 19,
      },
    ],
    code: 200,
    message: '',
  },
};
