import { isUrl } from '../utils/utils';

export const menuData = [{
  name: '表单类型',
  icon: 'book',
  path: 'formItemType',
  children: [{
    name: '表单类型页',
    path: 'formItemTypePage'
  }, {
    name: '表单创建页',
    path: 'FormItemCreatePage'
  }]
}, {
  name: '通用查询页',
  icon: 'search',
  path: 'generaltable',
  children: [{
    name: '标准列表页',
    path: 'channel'
  }]
}, {
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '详情页',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: '基础详情页',
    path: 'basic',
  }, {
    name: '高级详情页',
    path: 'advanced',
    authority: 'admin',
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}];
