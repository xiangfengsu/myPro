import { create, update, remove, queryPost } from '../services/generalApi';
import { showStautsMessageHandle } from '../utils/statusCode';

export default {
  namespace: 'usermanage',
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
      const response = yield call(queryPost, payload, '/sys/user/list');
      if (response) {
        const { body } = response;
        yield put({
          type: 'save',
          payload: {
            data: body,
          },
        });
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
        state => state.usermanage.data.pagination.current
      );
      Object.assign(payload, { page });
      const response = yield call(update, payload, '/sys/user/update');
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: false,
        },
      });
      if (response) {
        const { code = 200, body } = response;
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
        showStautsMessageHandle('usermanage', 'update', code);
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
      const response = yield call(create, payload, '/sys/user/save');
      yield put({
        type: 'changgeConfirmLoading',
        payload: {
          confirmLoading: false,
        },
      });
      if (response) {
        const { code = 200, body } = response;
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
        showStautsMessageHandle('usermanage', 'add', code);
      } else {
        showStautsMessageHandle('error');
      }
    },
    *remove({ payload }, { call, put, select }) {
      const page = yield select(
        state => state.usermanage.data.pagination.current
      );
      Object.assign(payload, { page });
      const response = yield call(remove, payload, '/sys/user/del');
      if (response) {
        const { code = 200, body } = response;
        if (code === 200) {
          yield put({
            type: 'save',
            payload: {
              data: body,
            },
          });
        }
        showStautsMessageHandle('usermanage', 'delete', code);
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
      const dataObj = action.payload.data;
      return {
        ...state,
        data: Object.assign(dataObj, {
          list:
            dataObj.list &&
            dataObj.list.map((item) => {
              return {
                ...item,
                roleids: item.sysRoleList && item.sysRoleList.map(rl => rl.id),
              };
            }),
        }),
      };
    },
  },
};
