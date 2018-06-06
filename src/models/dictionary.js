import { query } from '../services/dictionary';

export default {
  namespace: 'dictionary',
  state: {},
  effects: {
    *query({ payload }, { call, put }) {
      const { dictionaryKey } = payload;
      delete payload.dictionaryKey; // eslint-disable-line
      const response = yield call(query, payload);
      const { body = [] } = response;
      yield put({
        type: 'querySuccess',
        payload: {
          [dictionaryKey]: body,
        },
      });
    },
  },

  reducers: {
    querySuccess(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
