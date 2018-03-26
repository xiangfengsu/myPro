import { queryNotices } from "../services/api";
import { formatter } from "../utils/utils";
import { menuData } from "../common/menu";
function menuDataPathFormater(menuData) {
  const list = [];
  (function dataFormater(menuData) {
    menuData.forEach(item => {
      if (item.children && item.children.length > 0) {
        dataFormater(item.children);
      } else {
        list.push({
          path: `/${item.path}`,
          name: item.name
        });
      }
    });
  })(menuData);
  return list;
}

export default {
  namespace: "global",

  state: {
    collapsed: false,
    notices: [],
    currentPagePath: "",
    pageOpenedList: [],
    isWheel: false
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: "saveNotices",
        payload: data
      });
      yield put({
        type: "user/changeNotifyCount",
        payload: data.length
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: "saveClearedNotices",
        payload
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: "user/changeNotifyCount",
        payload: count
      });
    },
    *changePageOpenedListGeneral({ payload }, { put, select }) {
      if (payload !== undefined) {
        yield put({
          type: "saveCurrentPagePath",
          payload
        });
      } 
      const { user, global } = yield select(state => state);
      if (user) {
        const tagsList = menuDataPathFormater(formatter(user.currentUser.menuData));
        const currentPathList = tagsList.filter(tag => {
          return tag.path === global.currentPagePath;
        });
        yield put({
          type: "changePageOpenedList",
          payload: {
            currentPathList,
            currentPagePath: global.currentPagePath
          }
        });
      }
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload)
      };
    },
    saveCurrentPagePath(state, { payload }) {
      return {
        ...state,
        currentPagePath: payload
      };
    },
    removePageOpenedTag(state, { payload }) {
      const pageOpenedList = state.pageOpenedList.filter((pageTag, index) => {
        return pageTag.path !== payload;
      });
      return {
        ...state,
        pageOpenedList
      };
    },
    removeAllPageOpendTags(state, { payload }) {
      const { pageOpenedList } = state;
      return {
        ...state,
        pageOpenedList: [],
        currentPagePath: ""
      };
    },
    removeOtherPageOpendTags(state) {
      const { currentPagePath, pageOpenedList } = state;
      return {
        ...state,
        pageOpenedList: pageOpenedList.filter(tag => {
          return tag.path === currentPagePath;
        })
      };
    },
    changePageOpenedList(state, { payload }) {
      const { pageOpenedList } = state;
      const { currentPathList = [], currentPagePath } = payload;
      const newPageOpenList = [];
      if (pageOpenedList.length === 0) {
        newPageOpenList.push(...currentPathList);
      } else {
        const index = pageOpenedList.findIndex(item => {
          return item.path === currentPagePath;
        });
        if (index === -1) newPageOpenList.push(...currentPathList);
      }
      return {
        ...state,
        pageOpenedList: [...pageOpenedList, ...newPageOpenList],
        currentPagePath,
        isWheel: false
      };
    },
    changeMouseWheelStatus(state, { payload }) {
      return {
        ...state,
        isWheel: true
      };
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, search }) => {
        // console.log(pathname);
        if (pathname.indexOf("/user") === -1) {
          dispatch({
            type: "changePageOpenedListGeneral",
            payload: pathname
          });
        }
      });
    }
  }
};
