import { success } from '../utils/result';
import Mock from 'mockjs';
import { amt, datetime } from '../utils/common';
import { datadict } from '../utils/datadict';
import { bmw_trade_order_status } from '../datadict';

export default {
  'GET /api/bmw/cashier': (req: any, res: any) => {

    let orderStatus = datadict(bmw_trade_order_status);

    res.json(success(Mock.mock({
      'tradeOrderId|+1': 1,
      outTradeNo: '@string(32)',
      tradeNo: '@string(32)',
      tradeAmt: amt(),
      createdAt: datetime(),
      planCloseAt: datetime(),
      status: orderStatus.value,
      statusName: orderStatus.key,
      guaranteeFlag: false,
      reason: '@string(15)',
      'accessMchId|+1': 1,
      'paySceneId|+1': 1,
      // 图片
      imageUrl: Mock.Random.image('100x100'),
      // 订单标题
      orderTitle: '@string(15)',
      // 订单描述
      orderDesc: '@string(255)',
      // 当前登录账户
      userName: '@cword(3,4)',
      // 用户id
      userId: '@cword(3,4)',
      accessMchName: '@string(5)',
      ['payTypes|2-4']: [{
        'id|+1': 1,
        'paymentMchId|+1': 1,
        title: '@string(5)',
        payType: '@string(5)',
      }],
    })));
  },
  'POST /api/bmw/go-pay': (req: any, res: any) => {
    return res.json(success());
  },
  'POST /api/bmw/close-trade': (req: any, res: any) => {
    return res.json(success());
  },
};
