import { create, query, update, remove } from '../services/generalApi';
import { message } from 'antd';
export default {
  namespace: 'channel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      logs('payload', payload);
      const response = yield call(query, payload, '/api/sys_channel');
      const { status = -1, body, errorMes = '' } = response;
      yield put({
        type: 'save',
        payload: body,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *update({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(update, payload, '/api/sys_channel');
      const { status = -1, body, errorMes = '' } = response;
      if (status >= 200 && status < 300) {
        yield put({
          type: 'updateSuccess',
          payload,
        });
      } else {
        throw errorMes
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(create, payload, '/api/sys_channel');
      const { status = -1, body, errorMes = '' } = response;
      if (status >= 200 && status < 300) {
        yield put({
          type: 'save',
          payload: body,
        });
      } else {
        throw errorMes
      }

      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
    *remove({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(remove, payload, '/api/sys_channel');
      const { status = -1, body, errorMes = '' } = response;
      if (status >= 200 && status < 300) {
        message.success('删除成功')
        yield put({
          type: 'deleteSuccess',
          payload,
        });

      } else {
        throw errorMes;
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    updateSuccess(state, action) {
      const updateData = action.payload;
      let newList = [];
      newList = state.data.list.map(data => {
        if (data.id === updateData.id) {
          return {
            ...data,
            ...updateData
          };
        }
        return data;
      });
      return {
        ...state,
        data: {
          ...state.data,
          list: newList
        }


      };
    },
    deleteSuccess(state, action) {
      const id = action.payload.id;
      const newList = state.data.list.filter(data => data.id != id);
      return {
        ...state,
        data: {
          ...state.data,
          list: newList,

        }
      };
    },
  },
};
