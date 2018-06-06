function createData() {
  return {
    body: [
      {
        children: [
          {
            children: [
              {
                children: [],
                createtime: '2018-03-29 06:40',
                deptorder: 4,
                id: 8,
                name: '浦东新区分公司11',
                parentid: 5,
                remark: '浦东新区分公司',
                status: 2,
                updatetime: '2018-04-04 11:16',
              },
            ],
            createtime: '2018-03-29 06:37',
            deptorder: 1,
            id: 5,
            name: '上海分公司131',
            parentid: 4,
            remark: '上海分公司上海分公司上海分公司',
            status: 2,
            updatetime: '2018-04-08 09:20',
          },
          {
            children: [
              {
                children: [],
                createtime: '2018-03-29 06:39',
                deptorder: 2,
                id: 6,
                name: '北京分公司1',
                parentid: 7,
                remark: '北京分公司北京分公司',
                status: 2,
                updatetime: '2018-03-29 06:41',
              },
            ],
            createtime: '2018-03-29 06:39',
            deptorder: 3,
            id: 7,
            name: '重庆分公司',
            parentid: 4,
            remark: '重庆分公司重庆分公司重庆分公司',
            status: 2,
            updatetime: '2018-04-04 11:11',
          },
          {
            children: [],
            createtime: '2018-03-29 06:42',
            deptorder: 33,
            id: 9,
            name: '北京分公司',
            parentid: 4,
            remark: 'ff',
            status: 2,
            updatetime: '2018-04-04 11:11',
          },
          {
            children: [],
            createtime: '2018-04-04 11:19',
            deptorder: 1,
            id: 10,
            name: '测试公司1',
            parentid: 4,
            remark: '',
            status: 1,
            updatetime: '2018-04-04 11:20',
          },
          {
            children: [
              {
                children: [],
                createtime: '2018-04-09 06:36',
                deptorder: 1,
                id: 14,
                name: 'tttt',
                parentid: 11,
                remark: '',
                status: 2,
                updatetime: '2018-04-09 06:36',
              },
            ],
            createtime: '2018-04-04 05:33',
            deptorder: 1,
            id: 11,
            name: '北京分公司',
            parentid: 4,
            remark: '',
            status: 1,
            updatetime: '2018-04-08 04:01',
          },
          {
            children: [],
            createtime: '2018-04-08 02:19',
            deptorder: 11,
            id: 12,
            name: '测试部门',
            parentid: 4,
            remark: '',
            status: 1,
            updatetime: '',
          },
          {
            children: [],
            createtime: '2018-04-08 09:20',
            deptorder: 1,
            id: 13,
            name: 'test111',
            parentid: 4,
            remark: '',
            status: 1,
            updatetime: '',
          },
        ],
        createtime: '2018-03-29 06:10',
        deptorder: 1,
        id: 4,
        name: '总公司',
        parentid: 0,
        remark: '总公司',
        status: 1,
        updatetime: '',
      },
    ],
    code: 200,
    message: '',
  };
}
module.exports = {
  'GET /sys/dept/tree': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
  'POST /sys/dept/save': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
  'POST /sys/dept/update': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
  'POST /sys/dept/del': (req, res) => {
    const mockData = createData();
    res.json(mockData);
  },
};
