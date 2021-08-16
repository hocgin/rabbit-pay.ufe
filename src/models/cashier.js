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
    * complete({ payload, callback }, { call, put }) {
      let result = {};//yield ProjectApi.complete(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        yield put({ type: [FILL_COMPLETE], payload: result.data });
        if (callback) callback(result);
      }
    },
    * getOne({ payload, callback }, { call, put }) {
      let result = yield CashierApi.getOne(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        yield put({ type: [FILL_DETAIL], payload: result.data });
        if (callback) callback(result);
      }
    },
    * insertOne({ payload = {}, callback }, { call, put }) {
      let result = {}; // yield AuthorityApi.insert(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        if (callback) callback(result);
      }
    },
    * updateOne({ payload = {}, callback }, { call, put }) {
      let result = {}; // yield AuthorityApi.insert(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        if (callback) callback(result);
      }
    },
    * paging({ payload = {}, callback }, { call, put }) {
      let result = {}; // yield AuthorityApi.insert(payload);
      if (UiUtils.showErrorMessageIfExits(result)) {
        yield put({ type: FILL_PAGING, payload: result.data });
        if (callback) callback(result);
      }
    },
    * delete({ payload = {}, callback }, { call, put }) {
      let result = {}; // yield AuthorityApi.insert(payload);
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
        console.log('search', search);
        if (pathToRegexp('/cashier').test(pathname)) {
          let { u } = qs.parse(search);
          dispatch({ type: 'getOne', payload: { u } });
        }
      });
    },
  },
};
