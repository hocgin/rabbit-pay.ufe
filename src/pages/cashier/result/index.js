import React from 'react';
import styles from './index.less';
import { dispatchType } from '@/utils/model-utils';
import { connect } from 'dva';
import { Button, Result, message, Empty } from 'antd';
import CashierModel from '@/models/cashier';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';

@connect(({ global, cashier, loading, ...rest }) => {
  return {
    cashier: cashier?.detail,
    isGetCashierLoading: loading.effects[dispatchType(CashierModel, CashierModel.effects.getCashier)],
  };
}, dispatch => ({
  $getCashier: (args = {}) => dispatch({ type: dispatchType(CashierModel, CashierModel.effects.getCashier), ...args }),
}))
class index extends React.Component {
  state = {};

  render() {
    let { cashier } = this.props;
    // 交易状态: processing=>进行中; payed=>已支付; cancelled=>已取消; closed=>已关闭
    let status = { 'processing': 'info', 'payed': 'success', 'cancelled': 'info', 'closed': 'info' }[cashier?.status];
    let title = { 'processing': '进行中', 'payed': '支付成功', 'cancelled': '已取消', 'closed': '已关闭' }[cashier?.status];
    let isClosed = ['cancelled', 'closed'].includes(cashier?.status);
    return (<div className={styles.page}>
      <div className={styles.result}>
        {cashier ? (<Result status={status} title={title} subTitle={`交易单号: ${cashier?.outTradeNo}`}
                            extra={[<Button type='primary' onClick={this.onClickBack}>返回商户</Button>,
                              <Button onClick={this.onClickClose}>关闭窗口</Button>]}>
          {isClosed && (<div className='desc'>
            <Paragraph>
              <Text strong style={{ fontSize: 16 }}>关单原因: </Text>
            </Paragraph>
            <Paragraph> {cashier?.reason} </Paragraph>
          </div>)}
        </Result>) : (<Empty description={'单据不存在或已过期'}/>)}
      </div>
    </div>);
  }

  onClickBack = () => {
    let { cashier } = this.props;
    let frontJumpUrl = cashier?.frontJumpUrl;
    if (frontJumpUrl) {
      window.location.href = frontJumpUrl;
    } else {
      message.info('未设置回跳地址');
    }
  };
  onClickClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();

  };
}

export default index;
