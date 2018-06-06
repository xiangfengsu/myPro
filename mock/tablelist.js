const qs = require('qs');
const mockjs = require('mockjs');

const createData = (code = 200, pageNum = 1, pageSize = 10) => {
  const mockData = {};
  const dataList = mockjs.mock({
    [`data|${pageSize}`]: [
      {
        'id|+1': 1,
        'ordernum|+1': 1,
        'channelname|1': '@cword(4)',
        'cooperationstatus|1': ['直营', '小商户'],
        'channeltype|1': ['广告', '网络', '中介', '其他'],
        'channelsource|1': ['官网', '百度', '400介绍', '老客户'],
        'city|1': '@city()',
        'channelnature|1': [0, 1], // ['直营0', '非直营1']
        'status|1': [0, 1],
        'createtime|1': '@datetime("2017-12-dd")',
        'description|1': '@csentence',
      },
    ],
    pagination: {
      total: pageSize * 5,
      current: pageNum,
    },
  });
  const { data, pagination } = dataList;
  Object.assign(mockData, {
    code,
    body: {
      dictionary: {},
      extra: {},
      list: data,
      pagination,
    },
    message: '',
  });
  return mockData;
};
module.exports = {
  'POST /sys/tablelist/list': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
  'POST /sys/tablelist/save': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
  'POST /sys/tablelist/update': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
  'POST /sys/tablelist/del': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
};
