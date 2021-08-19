import UiUtils from '@/utils/ui-utils';
import CashierApi from '@/services/cashier';
import { pathToRegexp } from 'path-to-regexp';
import qs from 'query-string';


let FILL_COMPLETE = 'fillComplete';
let FILL_DETAIL = 'fillDetail';
let FILL_PAGING = 'fillPaging';

let initState = {
  paging: null,
  detail: null,
  complete: [],
};
export default {
  namespace: 'cashier',
  state: initState,
  effects: {
    * getCashier({ payload, callback }, { call, put }) {
      let result = yield CashierApi.getCashier(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        let data = result.data;
        yield put({ type: [FILL_DETAIL], payload: data });
      }
    },
    * goPay({ payload = {}, callback }, { call, put }) {
      let result = yield CashierApi.goPay(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        if (callback) callback(result);
      }
    },
    * closeTrade({ payload = {}, callback }, { call, put }) {
      let result = yield CashierApi.closeTrade(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        if (callback) callback(result);
      }
    },
  },
  reducers: {
    [FILL_COMPLETE](state, { payload }) {
      return { ...state, complete: payload };
    },
    [FILL_DETAIL](state, { payload }) {
      return { ...state, detail: payload };
    },
    [FILL_PAGING](state, { payload }) {
      return { ...state, paging: payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }, done) {
      return history.listen(({ pathname, search }) => {
        if (pathToRegexp('/cashier').test(pathname) || pathToRegexp('/cashier/result').test(pathname)) {
          dispatch({ type: 'getCashier', payload: { ...qs.parse(search) } });
        } else {
          window.location.href = 'https://wwww.hocgin.top';
        }
      });
    },
  },
};
