const qs = require('qs');

const createData = (code = 200, pageNum = 1) => {
  return {
    body: {
      dictionary: {
        status: {
          1: '正常',
          2: '已删除',
        },
      },
      extra: {},
      list: [
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 697,
          logtype: '/sys/log/list',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 696,
          logtype: '/sys/user/list',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 695,
          logtype: '/sys/log/list',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 694,
          logtype: '/sys/user/list',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 693,
          logtype: '/sys/user/list',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 692,
          logtype: '/sys/currentUser',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 691,
          logtype: '/sys/user/list',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 690,
          logtype: '/sys/log/list',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 689,
          logtype: '/sys/menu/update',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
        {
          bussessid: 0,
          createtime: '2018-04-10 02:19',
          id: 688,
          logtype: '/sys/menu/update',
          parameters: '',
          remark: '',
          sourceip: '101.81.24.181',
          useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          userid: 1,
          username: 'admin',
        },
      ],
      pagination: {
        current: pageNum,
        pageSize: 10,
        total: 294,
      },
    },
    code,
    message: '',
  };
};
module.exports = {
  'POST /sys/log/list': (req, res) => {
    const { pagination: { current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current);
    res.json(mockData);
  },
};
