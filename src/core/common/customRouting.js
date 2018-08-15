export default (dynamicWrapper, app) => {
  return {
    '/TableList/TableList': {
      name: '标准列表页',
      component: dynamicWrapper(
        app,
        ['TableList/model/tablelist', 'sys/Dictionary/model/dictionary'],
        () => import('../../pages/TableList/route/TableList')
      ),
    },
    '/generaltable/channelDetail/:id': {
      name: '详情页',
      component: dynamicWrapper(
        app,
        ['TableList/model/tablelist', 'sys/Dictionary/model/dictionary'],
        () => import('../../pages/TableList/route/TableList')
      ),
    },
  };
};
