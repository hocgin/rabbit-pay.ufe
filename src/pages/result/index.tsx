import React, {useEffect, useState} from 'react';
import styles from './index.less';
import {useInterval, useRequest} from 'ahooks';
import bmwService from '@/services/pay';
import useUrlState from '@ahooksjs/use-url-state';
import {Button, Empty, message, Result, Spin, Typography} from 'antd';
import Text from 'antd/es/typography/Text';
import classnames from 'classnames';
import {history} from "umi";


const Index: React.FC<{}> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [params] = useUrlState({u: undefined});
  let [data, setData] = useState<any>();
  let getCashier = useRequest(() => bmwService.getCashier(params.u), {
    onSuccess: (data: any) => {
      // if (data?.status === 'processing') {
      //   history.push('/cashier', {query: {...params},});
      // }
      setData(data);
    },
    onError: (err: any) => {
      // todo 跳到错误页面
    },
  });
  useInterval(() => getCashier.run(), 2.5 * 1000);

  if (getCashier?.loading) {
    return <div className={classnames(styles.page, styles.center)}><Spin/></div>;
  }
  let statusArr: any = {'processing': 'info', 'payed': 'success', 'cancelled': 'info', 'closed': 'info'};
  let titleArr: any = {'processing': '进行中', 'payed': '支付成功', 'cancelled': '已取消', 'closed': '已关闭'};
  let status = statusArr?.[data?.status] ?? 'info';
  let title = titleArr?.[data?.status] ?? '通知';
  let isClosed = ['cancelled', 'closed'].includes(data?.status);
  let isProcessing = ['processing'].includes(data?.status);

  let onClickBack = () => {
    let frontJumpUrl = data?.frontJumpUrl;
    if (frontJumpUrl) {
      window.location.href = frontJumpUrl;
    } else {
      messageApi.info('未设置回跳地址');
    }
  };
  let onClickBackPayPage = () => {
    history.push({pathname: '/cashier', query: {...params}});
  };

  let backBtn = (<Button type='primary' onClick={onClickBack}>返回商户</Button>);
  if (isProcessing) {
    backBtn = (<Button type='primary' onClick={onClickBackPayPage}>继续支付</Button>);
  }
  let onClickClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  return (<div className={styles.page}>
    {contextHolder}
    <div className={styles.result}>
      {data ? (<Result status={status} title={title} subTitle={`交易单号: ${data?.outTradeNo}`}
                       extra={[backBtn, <Button onClick={onClickClose}>关闭窗口</Button>]}>
        {isClosed && (<div className='desc'>
          <Typography.Paragraph>
            <Text strong className={styles.closeReason}>关单原因: </Text>
          </Typography.Paragraph>
          <Typography.Paragraph> {data?.reason || '系统关单'} </Typography.Paragraph>
        </div>)}
      </Result>) : (<Empty description={'支付单据不存在或已过期'}/>)}
    </div>
  </div>);
};

export default Index;
