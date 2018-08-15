export default (dynamicWrapper, app) => {
  return {
    '/': {
      component: dynamicWrapper(app, ['sys/User/model/user'], () =>
        import('../../core/layouts/BasicLayout')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../../core/layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['sys/Login/model/login'], () =>
        import('../../pages/sys/Login/route/Login')
      ),
    },
    '/formItemType/formItemTypePage': {
      name: '表单类型页',
      component: dynamicWrapper(app, ['sys/Dictionary/model/dictionary'], () =>
        import('../../pages/sys/FormType/route/FormType')
      ),
    },
    '/account/settings': {
      name: '个人中心',
      component: dynamicWrapper(
        app,
        ['sys/User/model/user', 'sys/User/Settings/model/settings'],
        () => import('../../pages/sys/User/Settings/route/Settings')
      ),
    },
    '/exception/403': {
      name: '403',
      component: dynamicWrapper(app, [], () => import('../../pages/sys/Exception/route/403')),
    },
    '/exception/404': {
      name: '404',
      component: dynamicWrapper(app, [], () => import('../../pages/sys/Exception/route/404')),
    },
    '/exception/500': {
      name: '500',
      component: dynamicWrapper(app, [], () => import('../../pages/sys/Exception/route/500')),
    },
    '/permission/department': {
      name: '部门管理',
      component: dynamicWrapper(
        app,
        ['sys/Auth/Department/model/department', 'sys/Dictionary/model/dictionary'],
        () => import('../../pages/sys/Auth/Department/route/Department')
      ),
    },
    '/permission/menumanage': {
      name: '菜单管理',
      component: dynamicWrapper(
        app,
        ['sys/Auth/MenuManage/model/menumanage', 'sys/Dictionary/model/dictionary'],
        () => import('../../pages/sys/Auth/MenuManage/route/MenuManage')
      ),
    },
    '/permission/rolemanage': {
      name: '角色管理',
      component: dynamicWrapper(
        app,
        ['sys/Auth/RoleManage/model/rolemanage', 'sys/Dictionary/model/dictionary'],
        () => import('../../pages/sys/Auth/RoleManage/route/RoleManage')
      ),
    },
    '/permission/usermanage': {
      name: '用户管理',
      component: dynamicWrapper(
        app,
        ['sys/Auth/UserManage/model/usermanage', 'sys/Dictionary/model/dictionary'],
        () => import('../../pages/sys/Auth/UserManage/route/UserManage')
      ),
    },
    '/permission/systemlog': {
      name: '系统日志',
      component: dynamicWrapper(app, ['sys/Auth/SystemLog/model/systemlog'], () =>
        import('../../pages/sys/Auth/SystemLog/route/SystemLog')
      ),
    },
  };
};
