import { menuData } from '../src/common/menu';
module.exports = {
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
      menuData: menuData,
      btnAuth: ['新建渠道', '删除渠道列表', '编辑渠道列表', '评估复核去处理']
    },
  },
  'POST /api/login/account': (req, res) => {
    // validateCode 100: 登录成功  101: 验证码错误 102: 用户名或密码错误
    const { password, userName, imgcaptcha, remember } = req.body;
    if (imgcaptcha === '123') {
      if (password === 'admin' && userName === 'admin') {
        res.send({
          status: 200,
          body: {
            validateCode: 100
          },
          errorMes: ''
        });
        return;
      } else {
        res.send({
          status: 200,
          body: {
            validateCode: 102
          },
          errorMes: ''
        });
        return;
      }
    } else {
      res.send({
        status: 200,
        body: {
          validateCode: 101
        },
        errorMes: ''
      });
      return;
    }
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
};