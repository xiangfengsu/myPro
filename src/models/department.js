import { create, query, update, remove } from "../services/generalApi";
import { PageConfig } from "../routes/PermissionManage/Department/pageConfig";
import { message } from "antd";
import { showStautsMessageHandle } from "../utils/statusCode";

function formatter(data = []) {
  return data.map(item => {
    const { id, name, parentid, updatetime, deptorder } = item;
    const result = {
      ...item,
      key: id
    };
    if (item.children && item.children.length !== 0) {
      result.children = formatter(item.children);
    } else {
      delete result.children;
    }
    return result;
  });
}

export default {
  namespace: "department",
  state: {
    data: {
      list: [],
      pagination: {}
    },
    statusCode: undefined,
    modalVisible: false,
    confirmLoading: false
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload, "/sys/dept/tree");
      if (response) {
        const { code, body, message = "" } = response;
        yield put({
          type: "save",
          payload: {
            data: formatter(body),
            statusCode: code
          }
        });
      }
    },
    *update({ payload }, { call, put, select }) {
      yield put({
        type: "changgeConfirmLoading",
        payload: {
          confirmLoading: true
        }
      });
      const response = yield call(update, payload, "/sys/dept/update");
      yield put({
        type: "changgeConfirmLoading",
        payload: {
          confirmLoading: false
        }
      });
      if (response) {
        const { code, body, message = "" } = response;
        if (code === 200) {
          yield put({
            type: "modalVisible",
            payload: {
              modalVisible: false
            }
          });
          yield put({
            type: "save",
            payload: {
              data: formatter(body),
              statusCode: code
            }
          });
        }
        showStautsMessageHandle("department", "update", code);
      } else {
        showStautsMessageHandle("error");
      }
    },
    *add({ payload, callback }, { call, put }) {
      yield put({
        type: "changgeConfirmLoading",
        payload: {
          confirmLoading: true
        }
      });
      const response = yield call(create, payload, "/sys/dept/save");
      yield put({
        type: "changgeConfirmLoading",
        payload: {
          confirmLoading: false
        }
      });
      if (response) {
        const { code = 200, body, message = "" } = response;
        if (code === 200) {
          yield put({
            type: "modalVisible",
            payload: {
              modalVisible: false
            }
          });
          yield put({
            type: "save",
            payload: {
              data: formatter(body),
              statusCode: code
            }
          });
        }
        showStautsMessageHandle("department", "add", code);
      } else {
        showStautsMessageHandle("error");
      }
    },
    *remove({ payload }, { call, put, select }) {
      const response = yield call(remove, payload, "/sys/dept/del");
      if (response) {
        const { code = 200, body, message = "" } = response;
        if (code === 200) {
          yield put({
            type: "save",
            payload: {
              data: formatter(body),
              statusCode: code
            }
          });
        }
        showStautsMessageHandle("department", "delete", code);
      } else {
        showStautsMessageHandle("error");
      }
    }
  },

  reducers: {
    modalVisible(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    changgeConfirmLoading(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    save(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.data
        },
        statusCode: action.payload.statusCode
      };
    }
  }
};
