'use strict';

const qs = require('qs');
const mockjs = require('mockjs');
const createData = function (status = 200, pageNum = 1, pageSize = 10, ) {
  const mockData = {};
  const dataList = mockjs.mock({
    [`data|${pageSize}`]: [{
      'id|+1': 1,
      'ordernum|+1': 1,
      'channelname|1': '@cword(4)',
      'cooperationstatus|1': ['直营', '小商户'],
      'channeltype|1': ['广告', '网络', '中介', '其他'],
      'channelsource|1': ['官网', '百度', '400介绍', '老客户'],
      'city|1': '@city()',
      'channelnature|1': [0, 1],//['直营0', '非直营1']
      'status|1': [0, 1],
      'createtime|1': '@datetime("2017-12-dd")',
      'description|1': '@csentence'
    }],
    pagination: {
      total: pageSize * 5,
      current: pageNum
    }
  });
  const { data, pagination } = dataList;
  Object.assign(mockData, {
    code:status,
    body: {
      list: data,
      pagination
    },
    message: ''
  });
  return mockData;
}
module.exports = {
  'GET /api/sys_channel'(req, res) {
    const params = qs.parse(req.query);
    const pageSize = params.pageSize - 0 || 10;
    const page = params.page - 0 || 1;
    const status = 200;
    const mockData = createData(status, page, pageSize);
    res.json(mockData);
  },
  'POST /api/sys_channel'(req, res) {
    const params = qs.parse(req.body);
    const status = 201;
    const mockData = createData(status);
    res.json(mockData);
  },
  'PUT /api/sys_channel'(req, res) {
    const params = qs.parse(req.body);
    const { id, page = 1 } = params;
    const status = 201;
    const mockData = createData(status, page);
    res.json(mockData);
  },
  'DELETE /api/sys_channel'(req, res) {
    const params = qs.parse(req.body);
    const { id, page = 1 } = params;
    const status = 204;
    const mockData = createData(status, page);
    res.json(mockData);
  },
};