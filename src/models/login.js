import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { getCookie, setCookie, delCookie } from '../utils/cookie';
import { encodeHandle, decodeHandle } from '../utils/base64';
export default {
  namespace: 'login',

  state: {
    type: 'account',
    status: undefined,
    errorMessage: ''
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      const { status, body: { validateCode } } = response;
      const errorMessage = {
        100: '登录成功',
        101: '验证码错误',
        102: '用户名或密码错误'
      };
      yield put({
        type: 'changeLoginStatus',
        payload: {
          type: payload.type,
          status: validateCode - 0 > 100 ? 'error' : 'ok',
          errorMessage: errorMessage[validateCode]
        },
      });
      // Login successfully
      logs('validateCode', validateCode);
      if (validateCode === 100) {
        logs('#####');
        setCookie(encodeHandle('name'), encodeHandle('name'));
        window.location.reload();
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.pushState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            errorMessage: ''
          },
        });
        delCookie(encodeHandle('name'));
        window.location.reload();
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  },
};
