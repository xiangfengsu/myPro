const createData = () => {
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
          createtime: '2018-04-08 06:45',
          id: 20,
          menuids: [52, 53, 54, 55],
          remark: '',
          rolename: 'test2',
          status: 1,
          updatetime: '2018-04-09 09:21',
        },
        {
          createtime: '2018-04-04 10:32',
          id: 19,
          menuids: [42, 45, 43, 44, 47, 48, 49, 50],
          remark: '',
          rolename: 'test1',
          status: 1,
          updatetime: '',
        },
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 2,
      },
    },
    code: 200,
    message: '',
  };
};
module.exports = {
  'POST /sys/role/list': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
  'POST /sys/role/save': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
  'POST /sys/role/update': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
  'POST /sys/role/del': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
};
