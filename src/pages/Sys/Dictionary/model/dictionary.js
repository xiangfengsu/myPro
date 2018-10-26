import { query } from '../service/dictionary';

export default {
  namespace: 'dictionary',
  state: {},
  effects: {
    *query({ payload }, { call, put }) {
      const { dictionaryKey, cache } = payload;
      let list = [];
      if (cache && localStorage[dictionaryKey]) {
        list = JSON.parse(localStorage[dictionaryKey]);
      } else {
        delete payload.cache; // eslint-disable-line
        delete payload.dictionaryKey; // eslint-disable-line
        const response = yield call(query, payload);
        const { body = [] } = response;
        list = body;
        if (cache) {
          localStorage[dictionaryKey] = JSON.stringify(body);
        }
      }

      yield put({
        type: 'querySuccess',
        payload: {
          [dictionaryKey]: list,
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
