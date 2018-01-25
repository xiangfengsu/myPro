import { create, query, update, remove } from '../services/generalApi';
import { message } from 'antd';
export default {
  namespace: 'channel',
  state: {
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload, '/api/sys_channel');
      const { status, body, errorMes = '' } = response;
      yield put({
        type: 'save',
        payload: body,
      });
    },
    *update({ payload }, { call, put, select }) {
      const page = yield select(state => state.channel.data.pagination.current);
      Object.assign(payload, { page });
      const response = yield call(update, payload, '/api/sys_channel');
      const { status, body, errorMes = '' } = response;
      message.success('修改成功');
      yield put({
        type: 'save',
        payload: body,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(create, payload, '/api/sys_channel');
      const { status, body, errorMes = '' } = response;
      message.success('添加成功');
      yield put({
        type: 'save',
        payload: body,
      });
    },
    *remove({ payload }, { call, put, select }) {
      const page = yield select(state => state.channel.data.pagination.current);
      Object.assign(payload, { page });
      const response = yield call(remove, payload, '/api/sys_channel');
      const { status, body, errorMes = '' } = response;
      message.success('删除成功');
      yield put({
        type: 'save',
        payload: body,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    }
  },
};
