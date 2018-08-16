export default (dynamicWrapper, app) => {
  return {
    '/': {
      component: dynamicWrapper(app, ['Sys/User/model/user'], () =>
        import('../../core/layouts/BasicLayout')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../../core/layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['Sys/Login/model/login'], () =>
        import('../../pages/Sys/Login/route/Login')
      ),
    },
    '/formItemType/formItemTypePage': {
      name: '表单类型页',
      component: dynamicWrapper(app, ['Sys/Dictionary/model/dictionary'], () =>
        import('../../pages/Sys/FormType/route/FormType')
      ),
    },
    '/account/settings': {
      name: '个人中心',
      component: dynamicWrapper(
        app,
        ['Sys/User/model/user', 'Sys/User/Settings/model/settings'],
        () => import('../../pages/Sys/User/Settings/route/Settings')
      ),
    },
    '/exception/403': {
      name: '403',
      component: dynamicWrapper(app, [], () => import('../../pages/Sys/Exception/route/403')),
    },
    '/exception/404': {
      name: '404',
      component: dynamicWrapper(app, [], () => import('../../pages/Sys/Exception/route/404')),
    },
    '/exception/500': {
      name: '500',
      component: dynamicWrapper(app, [], () => import('../../pages/Sys/Exception/route/500')),
    },
    '/permission/department': {
      name: '部门管理',
      component: dynamicWrapper(
        app,
        ['Sys/Auth/Department/model/department', 'Sys/Dictionary/model/dictionary'],
        () => import('../../pages/Sys/Auth/Department/route/Department')
      ),
    },
    '/permission/menumanage': {
      name: '菜单管理',
      component: dynamicWrapper(
        app,
        ['Sys/Auth/MenuManage/model/menumanage', 'Sys/Dictionary/model/dictionary'],
        () => import('../../pages/Sys/Auth/MenuManage/route/MenuManage')
      ),
    },
    '/permission/rolemanage': {
      name: '角色管理',
      component: dynamicWrapper(
        app,
        ['Sys/Auth/RoleManage/model/rolemanage', 'Sys/Dictionary/model/dictionary'],
        () => import('../../pages/Sys/Auth/RoleManage/route/RoleManage')
      ),
    },
    '/permission/usermanage': {
      name: '用户管理',
      component: dynamicWrapper(
        app,
        ['Sys/Auth/UserManage/model/usermanage', 'Sys/Dictionary/model/dictionary'],
        () => import('../../pages/Sys/Auth/UserManage/route/UserManage')
      ),
    },
    '/permission/systemlog': {
      name: '系统日志',
      component: dynamicWrapper(app, ['Sys/Auth/SystemLog/model/systemlog'], () =>
        import('../../pages/Sys/Auth/SystemLog/route/SystemLog')
      ),
    },
  };
};
