
export const menuData = [{
  name: '表单类型',
  icon: 'book',
  path: 'formItemType/formItemTypePage',
  children: []
},{
  name: '权限管理',
  icon: 'setting',
  path: 'permission',
  children: [{
    name: '部门管理',
    path: 'department'
  }, {
    name: '菜单管理',
    path: 'menumanage'
  }, {
    name: '角色管理',
    path: 'rolemanage'
  }, {
    name: '用户管理',
    path: 'usermanage'
  }, {
    name: '系统日志',
    path: 'systemlog'
  }]
}, {
  name: '通用查询页',
  icon: 'search',
  path: 'generaltable',
  children: [{
    name: '标准列表页',
    path: 'channel'
  }]
}
];
