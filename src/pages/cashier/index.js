import React from 'react';
import styles from './index.less';
import CashierModel from '@/models/cashier';
import { dispatchType } from '@/utils/model-utils';
import { connect } from 'dva';

@connect(({ global, cashier, loading, ...rest }) => {
  return {
    tradeOrder: cashier?.detail,
    isLoading: loading.effects[dispatchType(CashierModel, CashierModel.effects.getOne)],
  };
}, dispatch => ({
  $getCashier: (args = {}) => dispatch({ type: dispatchType(CashierModel, CashierModel.effects.getOne), ...args }),
}))
class index extends React.Component {

  componentDidMount() {
    let { $getCashier } = this.props;
    $getCashier();
  }

  render() {
    let { tradeOrder } = this.props;
    return (<div className={styles.page}>
      http://localhost:8000/cashier
    </div>);
  }
}

export default index;
