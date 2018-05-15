import { update } from "../services/generalApi";
import { showStautsMessageHandle } from "../utils/statusCode";
import { message } from "antd";
export default {
  namespace: "settings",
  state: {
    data: {
      list: [],
      pagination: {}
    },
    statusCode: 200
  },

  effects: {
    *update({ payload }, { call, put }) {
      const formValue = Object.assign({}, payload);
      delete formValue.cb;
      const response = yield call(update, formValue, "/sys/modify/password");
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
        showStautsMessageHandle("settings", "update", code);
        payload.cb && payload.cb(code);
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