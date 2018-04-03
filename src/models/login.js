import { accountLogin, accountLoginOut } from "../services/api";
import { setAuthority } from "../utils/authority";
import { getCookie, setCookie, delCookie } from "../utils/cookie";
import { encodeHandle, decodeHandle } from "../utils/base64";
export default {
  namespace: "login",

  state: {
    type: "account",
    status: undefined,
    errorMessage: ""
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload, "/api/login/account");
      const { code } = response;
      const errorMessage = {
        200: "登录成功",
        100: "验证码错误",
        101: "用户名或密码错误"
      };
      yield put({
        type: "changeLoginStatus",
        payload: {
          type: payload.type,
          status: code !== 200 ? "error" : "ok",
          errorMessage: errorMessage[code]
        }
      });
      // Login successfully
      logs("code", code);
      if (code === 200) {
        setCookie(encodeHandle("name"), encodeHandle("name"));
        window.location.reload();
      }
    },
    *logout(_, { call,put, select }) {
      const response = yield call(accountLoginOut, "/sys/logout");
      const { code } = response;
      if (code === 200) {
        try {
          // get location pathname
          const urlParams = new URL(window.location.href);
          const pathname = yield select(
            state => state.routing.location.pathname
          );
          // add the parameters in the url
          urlParams.searchParams.set("redirect", pathname);
          window.history.pushState(null, "login", urlParams.href);
        } finally {
          yield put({
            type: "changeLoginStatus",
            payload: {
              status: false,
              errorMessage: ""
            }
          });
          delCookie(encodeHandle("name"));
          window.location.reload();
        }
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
