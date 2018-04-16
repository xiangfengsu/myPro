import { create, query, update, remove } from "../services/generalApi";
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
  namespace: "menumanage",
  state: {
    data: {
      list: [],
      pagination: {}
    },
    statusCode: 200
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload, "/sys/menu/tree");
      if (response) {
        const { code = 200, body, message = "" } = response;
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
      const response = yield call(update, payload, "/sys/menu/update");
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
        } else {
          yield put({
            type: "changeCode",
            payload: {
              statusCode: code
            }
          });
        }
        showStautsMessageHandle("menumanage", "update", code);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(create, payload, "/sys/menu/save");
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
        } else {
          yield put({
            type: "changeCode",
            payload: {
              statusCode: code
            }
          });
        }
        showStautsMessageHandle("menumanage", "add", code);
      }
    },
    *remove({ payload }, { call, put, select }) {
      const response = yield call(remove, payload, "/sys/menu/del");
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
        } else {
          yield put({
            type: "changeCode",
            payload: {
              statusCode: code
            }
          });
        }
        showStautsMessageHandle("menumanage", "delete", code);
      }
    }
  },

  reducers: {
    changeCode(state, { payload }) {
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
