import { menuData } from "../src/common/menu";
module.exports = {
  "GET /api/currentUser": {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: "分页",
        exp: 2
      }
    },
    $body: {
      body: {
        menu: [{
          path: "formItemType/formItemTypePage",
          children: [],
          icon: "book",
          name: "表单类型",
          menutype: 1,
          id: 1
      },{
        name: '通用查询页',
        icon: 'search',
        path: 'generaltable',
        menutype: 1,
        id: 2,
        children: [{
          name: '标准列表页',
          path: 'channel',
          icon: '',
          menutype: 2,
          id: 3,
        }]
      }],
        btn: [],
        user: {
          createtime: 1522318223000,
          sysRoleList: [
            {
              createtime: 1522388938000,
              rolename: "系统管理员",
              remark: "系统管理员",
              id: 5,
              menuids: "",
              updatetime: "",
              status: 1
            }
          ],
          deptid: 4,
          mobile: "18516670899",
          remark: "",
          avatar:"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          sysDept: {
            createtime: 1522318223000,
            children: "",
            deptorder: 1,
            name: "总公司",
            remark: "总公司",
            id: 4,
            updatetime: "",
            parentid: 0,
            status: 1
          },
          uid: "42caaea",
          password: "be98207ac6d9de9ce8f53ada21922be3",
          nickname: "系统管理员",
          id: 1,
          menuids: "",
          updatetime: 1522649182000,
          account: "admin",
          email: "admin@ebaochina.com",
          issys: 1,
          status: 1,
          username: "admin"
        }
      },
      code: 200,
      message: ""
    }
  },
  "POST /api/login/account": (req, res) => {
    // validateCode 200: 登录成功    100: 验证码错误 101: 用户名或密码错误
    const { password, userName, imgcaptcha, remember } = req.body;
    if (imgcaptcha === "123") {
      if (password === "admin" && userName === "admin") {
        res.send({
          code: 200,
          body: {
          },
          errorMes: ""
        });
        return;
      } else {
        res.send({
          code: 101,
          body: {
          },
          errorMes: ""
        });
        return;
      }
    } else {
      res.send({
        code: 100,
        body: {
        },
        errorMes: ""
      });
      return;
    }
  },
  "POST /api/register": (req, res) => {
    res.send({ status: "ok", currentAuthority: "user" });
  },
  "GET /sys/logout": (req, res) => {
    res.send({ 
      code:200,
      body:{},
      message:''
    });
  }
};
