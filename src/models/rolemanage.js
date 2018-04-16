import {
  create,
  query,
  update,
  remove,
  queryPost
} from "../services/generalApi";
import { showStautsMessageHandle } from "../utils/statusCode";
import { message } from "antd";
export default {
  namespace: "rolemanage",
  state: {
    data: {
      list: [],
      pagination: {}
    },
    statusCode: 200
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPost, payload, "/sys/role/list");
      if (response) {
        const { code = 200, body, message = "" } = response;
        yield put({
          type: "save",
          payload: {
            data: body,
            statusCode: code
          }
        });
      }
    },
    *update({ payload }, { call, put, select }) {
      const response = yield call(update, payload, "/sys/role/update");
      if (response) {
        const { code = 200, body, message = "" } = response;
        if (code === 200) {
          yield put({
            type: "save",
            payload: {
              data: body,
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
        showStautsMessageHandle("rolemanage", "update", code);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(create, payload, "/sys/role/save");
      if (response) {
        const { code = 200, body, message = "" } = response;
        if (code === 200) {
          yield put({
            type: "save",
            payload: {
              data: body,
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
        showStautsMessageHandle("rolemanage", "add", code);
      }
    },
    *remove({ payload }, { call, put, select }) {
      const response = yield call(remove, payload, "/sys/role/del");
      if (response) {
        const { code = 200, body, message = "" } = response;
        if (code === 200) {
          yield put({
            type: "save",
            payload: {
              data: body,
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
        showStautsMessageHandle("rolemanage", "delete", code);
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
        data: action.payload.data
      };
    }
  }
};
