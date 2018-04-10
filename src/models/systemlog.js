import {
  create,
  query,
  queryPost,
  update,
  remove
} from "../services/generalApi";
import { message } from "antd";
export default {
  namespace: "systemlog",
  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPost, payload, "/sys/log/list");
      if (response) {
        const { status, body, errorMes = "" } = response;
        yield put({
          type: "save",
          payload: body
        });
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  }
};
