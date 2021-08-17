import React from 'react';
import styles from './index.less';
import CashierModel from '@/models/cashier';
import { dispatchType } from '@/utils/model-utils';
import { connect } from 'dva';
import { Button, Descriptions, Divider, Empty, Radio, Space, Statistic } from 'antd';

@connect(({ global, cashier, loading, ...rest }) => {
  return {
    cashier: cashier?.detail,
    isGetCashierLoading: loading.effects[dispatchType(CashierModel, CashierModel.effects.getCashier)],
    isGoPayLoading: loading.effects[dispatchType(CashierModel, CashierModel.effects.goPay)],
    isCloseTradeLoading: loading.effects[dispatchType(CashierModel, CashierModel.effects.closeTrade)],
  };
}, dispatch => ({
  $getCashier: (args = {}) => dispatch({ type: dispatchType(CashierModel, CashierModel.effects.getCashier), ...args }),
  $goPay: (args = {}) => dispatch({ type: dispatchType(CashierModel, CashierModel.effects.goPay), ...args }),
  $closeTrade: (args = {}) => dispatch({ type: dispatchType(CashierModel, CashierModel.effects.closeTrade), ...args }),
}))
class index extends React.Component {
  state = {
    payType: null,
  };

  componentDidMount() {
    let { $getCashier } = this.props;
  }

  render() {
    let { cashier, isGetCashierLoading, isGoPayLoading, isCloseTradeLoading } = this.props;
    let payTypes = cashier?.payTypes || [];

    return (<div className={styles.page}>
      {/* LOGO */}
      <div className={styles.cashier}>
        {cashier ? (<>
          {/* 交易单详情 */}
          <Divider orientation='left'>交易单详情</Divider>
          <Descriptions column={2}>
            <Descriptions.Item label='交易单号'>{cashier?.outTradeNo}</Descriptions.Item>
            <Descriptions.Item label='订单金额'>{cashier?.tradeAmt}</Descriptions.Item>
            <Descriptions.Item label='收款方'>{cashier?.accessMchName}</Descriptions.Item>
          </Descriptions>
          {/* 支付方式 */}
          <Divider orientation='left'>支付方式</Divider>
          <Radio.Group defaultValue={payTypes[0]?.payType} onChange={this.onChangePayType}>
            <Space direction='vertical'>
              {payTypes.map(({ payType, title = '未设置' }) => (<Radio value={`${payType}`}>{title}({payType})</Radio>))}
            </Space>
          </Radio.Group><br />
          {/* 操作按钮 */}
          <Divider />
          <div className={styles.toolbar}>
            <Button type='text' loading={isCloseTradeLoading} onClick={this.onClickCloseTrade}>取消交易</Button>
            <Divider type='vertical' />
            <Button type='primary' loading={isGoPayLoading} onClick={this.onClickGoPay}>确认付款</Button>
          </div>
        </>) : (<Empty description={'单据不存在或已过期'} />)}
      </div>
    </div>);
  }

  onChangePayType = (e) => {
    this.setState({ payType: e.target.value });
  };

  onClickCloseTrade = () => {
    let { $closeTrade, cashier } = this.props;
    $closeTrade({ payload: { tradeOrderId: cashier?.tradeOrderId }, callback: null });
  };

  onClickGoPay = () => {
    let { $goPay, cashier } = this.props;
    let { payType } = this.state;
    $goPay({
      payload: { tradeOrderId: cashier?.tradeOrderId, paySceneId: cashier?.paySceneId, payType: payType },
      callback: null,
    });
  };

  onCheckPayResult = () => {

  };

}

export default index;
