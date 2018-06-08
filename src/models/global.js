import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    currentPagePath: '',
    pageOpenedList: [],
    isWheel: false,
  },

  effects: {
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
    *changePageOpenedListGeneral({ payload }, { put }) {
      const { pathname, menuData } = payload;
      const currentPathList = menuData.filter(item =>
        item.menutype === 2&&pathToRegexp(item.path).test(pathname)
      );
      if (currentPathList.length > 0) {
        yield put({
          type: 'changePageOpenedList',
          payload: {
            currentPathList,
          },
        });
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    removePageOpenedTag(state, { payload }) {
      const pageOpenedList = state.pageOpenedList.filter((pageTag) => {
        return pageTag.path !== payload;
      });
      return {
        ...state,
        pageOpenedList,
      };
    },
    removeAllPageOpendTags(state) {
      return {
        ...state,
        pageOpenedList: [],
        currentPagePath: '',
      };
    },
    removeOtherPageOpendTags(state) {
      const { currentPagePath, pageOpenedList } = state;
      return {
        ...state,
        pageOpenedList: pageOpenedList.filter((tag) => {
          return tag.path === currentPagePath;
        }),
      };
    },
    changePageOpenedList(state, { payload }) {
      const { currentPathList } = payload;
      const currPath = currentPathList[0].path;
      let pageOpenedList = [];
      let currentPagePath = '';
      currentPagePath = currPath;
      if (state.pageOpenedList.length === 0) {
        pageOpenedList = [...currentPathList];
      } else {
        const isTagInAll = state.pageOpenedList.find((tag) => {
          return tag.path === currPath;
        });
        if (!isTagInAll) {
          pageOpenedList = [...state.pageOpenedList, ...currentPathList];
        } else {
          pageOpenedList = [...state.pageOpenedList];
        }
      }
      return {
        ...state,
        pageOpenedList,
        currentPagePath,
        isWheel: false,
      };
    },
    changeMouseWheelStatus(state) {
      return {
        ...state,
        isWheel: true,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      return history.listen(() => {});
    },
  },
};
