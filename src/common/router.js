import { createElement } from 'react';
import dynamic from 'dva/dynamic';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models
        .filter(model => modelNotExisted(app, model))
        .map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () =>
        import('../layouts/BasicLayout')
      ),
    },
    '/formItemType/formItemTypePage': {
      name: '表单类型页',
      component: dynamicWrapper(app, ['user', 'dictionary'], () =>
        import('../routes/FormItemType/Index')
      ),
    },
    '/TableList/TableList': {
      name: '标准列表页',
      component: dynamicWrapper(app, ['tablelist', 'dictionary'], () =>
        import('../routes/TableList/Index')
      ),
    },
    '/generaltable/channelDetail/:id': {
      name: '详情页',
      component: dynamicWrapper(app, ['tablelist', 'dictionary'], () =>
        import('../routes/TableList/Index')
      ),
    },
    '/permission/department': {
      name: '部门管理',
      component: dynamicWrapper(app, ['department', 'dictionary'], () =>
        import('../routes/PermissionManage/Department/Index')
      ),
    },
    '/permission/menumanage': {
      name: '菜单管理',
      component: dynamicWrapper(app, ['menumanage', 'dictionary'], () =>
        import('../routes/PermissionManage/MenuManage/Index')
      ),
    },
    '/permission/rolemanage': {
      name: '角色管理',
      component: dynamicWrapper(app, ['rolemanage', 'dictionary'], () =>
        import('../routes/PermissionManage/RoleManage/Index')
      ),
    },
    '/permission/usermanage': {
      name: '用户管理',
      component: dynamicWrapper(app, ['usermanage', 'dictionary'], () =>
        import('../routes/PermissionManage/UserManage/Index')
      ),
    },
    '/permission/systemlog': {
      name: '系统日志',
      component: dynamicWrapper(app, ['systemlog'], () =>
        import('../routes/PermissionManage/SystemLog/Index')
      ),
    },
    '/account/settings': {
      name: '个人中心',
      component: dynamicWrapper(app, ['user', 'settings'], () =>
        import('../routes/Account/Settings/Index')
      ),
    },
    '/exception/403': {
      name: '403',
      component: dynamicWrapper(app, [], () =>
        import('../routes/Exception/403')
      ),
    },
    '/exception/404': {
      name: '404',
      component: dynamicWrapper(app, [], () =>
        import('../routes/Exception/404')
      ),
    },
    '/exception/500': {
      name: '500',
      component: dynamicWrapper(app, [], () =>
        import('../routes/Exception/500')
      ),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () =>
        import('../routes/User/Login')
      ),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () =>
        import('../routes/User/Register')
      ),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/User/RegisterResult')
      ),
    },
  };
  // Get name from ./menu.js or just set it in the router data.

  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    // const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name,
      authority: routerConfig[item].authority,
    };
  });
  return routerData;
};
