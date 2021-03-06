import { query as queryUsers, queryCurrent } from '../service/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      // logs('response111',response);
      const { body = {} } = response || {};
      yield put({
        type: 'saveCurrentUser',
        payload: body,
        // payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      const { menu = [], user = {}, btn = [] } = action.payload;
      return {
        ...state,
        currentUser: {
          menuData: menu,
          btnAuth: btn,
          ...user,
        },
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
