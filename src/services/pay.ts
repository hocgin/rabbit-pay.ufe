import {stringify} from 'query-string';
import {usePost, useGet, RabbitKit} from '@hocgin/hkit';


export default class {

  static getCashier(code: string) {
    let queryString = stringify({u: code});
    return useGet(`/api/pay/cashier?${queryString}`, {})
      .then(RabbitKit.thenDataTryErrorIfExits);
  }

  static goPay({...payload}: any) {
    return usePost(`/api/pay/go-pay`, {data: {...payload}})
      .then(RabbitKit.thenDataTryErrorIfExits);
  }

  static closeTrade(payload: any) {
    return usePost(`/api/pay/close-trade`, {data: {...payload}})
      .then(RabbitKit.thenDataTryErrorIfExits);
  }
}
