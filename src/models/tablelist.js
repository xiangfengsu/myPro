import { create, update, remove, queryPost } from '../services/generalApi';
import { showStautsMessageHandle } from '../utils/statusCode';

export default {
  namespace: 'tablelist',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    modalVisible: false,
    confirmLoading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPost, payload, '/sys/tablelist/list');
      if (response) {
        const { code, body } = response;
        if (code === 200) {
          yield put({
            type: 'save',
            payload: {
              data: body,
            },
          });
        }
      } else {
        showStautsMessageHandle('error');
      }
    },
    *update({ payload }, { call, put, select }) {
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: true,
        },
      });
      const page = yield select(
        state => state.tablelist.data.pagination.current
      );
      Object.assign(payload, { page });
      const response = yield call(update, payload, '/sys/tablelist/update');
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: false,
        },
      });
      if (response) {
        const { code, body } = response;
        if (code === 200) {
          yield put({
            type: 'modalVisible',
            payload: {
              modalVisible: false,
            },
          });
          yield put({
            type: 'save',
            payload: {
              data: body,
            },
          });
        }
        showStautsMessageHandle('general', 'update', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
    *add({ payload }, { call, put }) {
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: true,
        },
      });
      const response = yield call(create, payload, '/sys/tablelist/save');
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: false,
        },
      });
      if (response) {
        const { code, body } = response;
        if (code === 200) {
          yield put({
            type: 'modalVisible',
            payload: {
              modalVisible: false,
            },
          });
          yield put({
            type: 'save',
            payload: {
              data: body,
            },
          });
        }
        showStautsMessageHandle('general', 'add', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
    *remove({ payload }, { call, put, select }) {
      const page = yield select(
        state => state.tablelist.data.pagination.current
      );
      Object.assign(payload, { page });
      const response = yield call(remove, payload, '/sys/tablelist/del');
      if (response) {
        const { code, body } = response;
        if (code === 200) {
          yield put({
            type: 'save',
            payload: {
              data: body,
            },
          });
        }
        showStautsMessageHandle('general', 'delete', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
  },

  reducers: {
    modalVisible(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changgeConfirmLoading(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
