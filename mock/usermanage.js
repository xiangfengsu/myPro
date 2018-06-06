const qs = require('qs');

const createData = (code = 200, pageNum = 1, pageSize = 10) => {
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
          account: 'test',
          avatar: '',
          createtime: '2018-04-04 09:54',
          deptid: 4,
          email: 'sdfsdf@qq.com',
          id: 14,
          issys: 0,
          menuids: [42, 43, 44, 45, 47, 48, 49, 50],
          mobile: '13212312111',
          nickname: 'test',
          password: '711674bc0b99ea1d3e7ab6e9f4166512',
          remark: '',
          status: 1,
          sysDept: {
            children: '',
            createtime: '2018-03-29 06:10',
            deptorder: 1,
            id: 4,
            name: '总公司',
            parentid: 0,
            remark: '总公司',
            status: 1,
            updatetime: '',
          },
          sysRoleList: [
            {
              createtime: '2018-04-04 10:32',
              id: 19,
              menuids: '',
              remark: '',
              rolename: 'test1',
              status: 1,
              updatetime: '',
            },
          ],
          uid: '7f78c601f90',
          updatetime: '',
          username: 'test',
        },
        {
          account: 't',
          avatar: '',
          createtime: '2018-04-08 02:52',
          deptid: 9,
          email: 'sdfsdf@qq.com',
          id: 15,
          issys: 0,
          menuids: [],
          mobile: '15412122222',
          nickname: 't',
          password: '3c87528cb0cc44322b9bb380d6179d83',
          remark: '',
          status: 2,
          sysDept: {
            children: '',
            createtime: '2018-03-29 06:42',
            deptorder: 33,
            id: 9,
            name: '北京分公司',
            parentid: 4,
            remark: 'ff',
            status: 2,
            updatetime: '2018-04-04 11:11',
          },
          sysRoleList: [],
          uid: 'ee705ccaa10',
          updatetime: '2018-04-09 06:29',
          username: 't',
        },
        {
          account: 'admin',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          createtime: '2018-03-29 06:10',
          deptid: 4,
          email: 'admin@ebaochina.com',
          id: 1,
          issys: 1,
          menuids: [],
          mobile: '18516670899',
          nickname: '系统管理员',
          password: 'be98207ac6d9de9ce8f53ada21922be3',
          remark: '',
          status: 1,
          sysDept: {
            children: '',
            createtime: '2018-03-29 06:10',
            deptorder: 1,
            id: 4,
            name: '总公司',
            parentid: 0,
            remark: '总公司',
            status: 1,
            updatetime: '',
          },
          sysRoleList: [],
          uid: '42caaea',
          updatetime: '2018-04-02 02:06',
          username: 'admin',
        },
      ],
      pagination: {
        current: pageNum,
        pageSize,
        total: 3,
      },
    },
    code,
    message: '',
  };
};
module.exports = {
  'POST /sys/user/list': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
  'POST /sys/user/save': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
  'POST /sys/user/update': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
  'POST /sys/user/del': (req, res) => {
    const { pagination: { pageSize = 10, current = 1 } } = qs.parse(req.body);
    const mockData = createData(200, current, pageSize);
    res.json(mockData);
  },
};
