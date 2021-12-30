import { request, usePost, useGet } from '@hocgin/ui';
import { stringify } from 'query-string';
import { Utils } from '@hocgin/ui';

export default class {

  static getCashier({ id, ...payload }: any) {
    let queryString = stringify(payload);
    return useGet(`/api/bmw/cashier?${queryString}`, {})
      .then(Utils.Struct.thenData);
  }

  static goPay({ ...payload }: any) {
    return usePost(`/api/bmw/go-pay`, { data: { ...payload } });
  }

  static closeTrade(payload: any) {
    return usePost(`/api/bmw/close-trade`, { data: { ...payload } });
  }
}
