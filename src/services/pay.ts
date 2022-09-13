import {stringify} from 'query-string';
import {Utils} from '@hocgin/ui';

let {request, usePost, useGet} = Utils.Request;

export default class {

  static getCashier(code: string) {
    let queryString = stringify({u: code});
    return useGet(`/api/pay/cashier?${queryString}`, {})
      .then(Utils.Struct.thenShowErrorIfExits)
      .then(Utils.Struct.thenData);
  }

  static goPay({...payload}: any) {
    return usePost(`/api/pay/go-pay`, {data: {...payload}})
      .then(Utils.Struct.thenShowErrorIfExits)
      .then(Utils.Struct.thenData);
  }

  static closeTrade(payload: any) {
    return usePost(`/api/pay/close-trade`, {data: {...payload}})
      .then(Utils.Struct.thenShowErrorIfExits)
      .then(Utils.Struct.thenData);
  }
}
