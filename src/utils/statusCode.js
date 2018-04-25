import { message } from "antd";
export const statusCode = {
  department: {
    add: {
      "200": "添加成功",
      "0": "父级公司不存在",
      "-1": "部门名称重复",
      "400":"缺少参数或参数格式不正确"
    },
    update:{
      "200": "修改成功",
      "400":"缺少参数或参数格式不正确",
    },
    delete:{
      "200": "删除成功",
    }
  },
  menumanage: {
    add: {
      "200": "添加成功",
      "0": "父级菜单不存在",
      "-1": "菜单名称重复",
      "400":"缺少参数或参数格式不正确"
    },
    update:{
      "200": "修改成功",
      "0": "父级菜单不存在",
      "-1": "菜单名称重复",
      "400":"缺少参数或参数格式不正确"
    },
    delete:{
      "200": "删除成功",
      "0": "父级菜单不存在",
      "-1": "菜单名称重复"
    }
  },
  rolemanage: {
    add: {
      "200": "添加成功",
      "0": "父级菜单不存在",
      "-1": "角色名重复",
      "400":"缺少参数或参数格式不正确"
    },
    update:{
      "200": "修改成功",
      "400":"缺少参数或参数格式不正确",
      "-1": "角色名重复",
    },
    delete:{
      "200": "删除成功",
    }
  },
  usermanage: {
    add: {
      "200": "添加成功",
      "-2": "部门不存在",
      "-1": "用户名重复",
      "400":"缺少参数或参数格式不正确"
    },
    update:{
      "200": "修改成功",
      "400":"缺少参数或参数格式不正确",
      "-3":"用户不存在",
      "-1": "用户名重复",
    },
    delete:{
      "200": "删除成功",
    }
  },
  settings:{
    update:{
      "200": "密码修改成功",
      "-1": "原密码错误",
    }
  }
};
export function showStautsMessageHandle(router, type, code) {
    console.log(router,type,code);
    const errorInfo = statusCode[router][type][code];
    
    if(code === 200){
        message.success(errorInfo);
    }else{
        message.error(errorInfo);
    }
}
