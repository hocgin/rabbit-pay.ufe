import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { useRequest } from 'ahooks';
import bmwService from '@/services/bmw';
import { history } from 'umi';
import useUrlState from '@ahooksjs/use-url-state';
import { Button, Empty, message, Result, Spin } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import classnames from 'classnames';

const Index: React.FC<{}> = (props, ref) => {
  const [params, setParams] = useUrlState({ u: undefined });
  let [data, setData] = useState<any>(undefined);
  let getCashier = useRequest(bmwService.getCashier, {
    manual: true,
    onSuccess: (data: any) => {
      setData(data);
      if (data?.status === 'processing') {
        history.push({
          pathname: '/cashier',
          query: { ...params },
        });
      }
    },
    onError: (err: any) => {
      // todo 跳到错误页面
    },
  });

  useEffect(() => {
    let u = params?.u;
    if (!u) history.push({ pathname: '/404', query: { ...params } });
    getCashier.runAsync({ u });
    let interval = setInterval(() => data && getCashier.run({ u }), 2.5 * 1000);
    return () => clearInterval(interval);
  }, [params?.u]);
  if (!data && getCashier?.loading) {
    return <div className={classnames(styles.page, styles.center)}><Spin /></div>;
  }
  let statusArr: any = { 'processing': 'info', 'payed': 'success', 'cancelled': 'info', 'closed': 'info' };
  let titleArr: any = { 'processing': '进行中', 'payed': '支付成功', 'cancelled': '已取消', 'closed': '已关闭' };
  let status = statusArr?.[data?.status] ?? 'info';
  let title = titleArr?.[data?.status] ?? '通知';
  let isClosed = ['cancelled', 'closed'].includes(data?.status);
  let isProcessing = ['processing'].includes(data?.status);

  let onClickBack = () => {
    let frontJumpUrl = data?.frontJumpUrl;
    if (frontJumpUrl) {
      window.location.href = frontJumpUrl;
    } else {
      message.info('未设置回跳地址');
    }
  };
  let onClickBackPayPage = () => {
    history.push({ pathname: '/cashier', query: { ...params } });
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
    <div className={styles.result}>
      {data ? (<Result status={status} title={title} subTitle={`交易单号: ${data?.outTradeNo}`}
                       extra={[backBtn, <Button onClick={onClickClose}>关闭窗口</Button>]}>
        {isClosed && (<div className='desc'>
          <Paragraph>
            <Text strong className={styles.closeReason}>关单原因: </Text>
          </Paragraph>
          <Paragraph> {data?.reason || '系统关单'} </Paragraph>
        </div>)}
      </Result>) : (<Empty description={'单据不存在或已过期'} />)}
    </div>
  </div>);
};

export default Index;
