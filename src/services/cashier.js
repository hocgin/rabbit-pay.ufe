import request from '@/utils/request';
import { stringify } from 'query-string';

export default class CashierApi {
  static getCashier({ ...payload }) {
    let queryString = stringify(payload);
    return request(`/bmw/cashier?${queryString}`, {
      method: 'GET',
    });
  }

  static goPay(payload) {
    return request(`/bmw/go-pay`, {
      method: 'POST',
      body: { ...payload },
    });
  }

  static closeTrade(payload) {
    return request(`/bmw/close-trade`, {
      method: 'POST',
      body: { ...payload },
    });
  }

}
