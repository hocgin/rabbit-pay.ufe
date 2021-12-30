import * as React from 'react';
import useUrlState from '@ahooksjs/use-url-state';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import { Money } from '@hocgin/ui';
import TitleSpec from '@/components/TitleSpec';
import bmwService from '@/services/bmw';
import { Spin, Avatar, Row, Col, Space, Button, Modal, message } from 'antd';
import classnames from 'classnames';
import { TrophyOutlined } from '@ant-design/icons';

const RadioOption: React.FC<{ src?: string, title?: string, checked?: boolean, onClick: any }> = ({
                                                                                                    src = 'https://cloudpayweb-fat7.orangebank.com.cn/pc/images/bank-logo-map/PAB.png',
                                                                                                    title = '支付宝',
                                                                                                    checked = false,
                                                                                                    onClick,
                                                                                                  }, ref) => {
  return <div onClick={onClick} className={classnames(styles.radioOption, {
    [styles.checked]: checked,
  })}>
    <Avatar className={styles.image} src={src} shape={'square'} size={24} />
    <div className={styles.title}>{title}</div>
  </div>;
};


const Index: React.FC<{}> = (props, ref) => {
  const [params, setParams] = useUrlState({ u: undefined });
  let [more, setMore] = useState<boolean>(false);
  let [data, setData] = useState<any>(undefined);
  let [check, setCheck] = useState(0);
  let getCashier = useRequest(bmwService.getCashier, {
    manual: true,
    onSuccess: (data: any) => {
      if (data?.status !== 'processing') {
        // history.push({ pathname: '/result', query: { ...params } });
      }
      setData(data);
    },
    onError: (err: any) => {
      // todo 跳到错误页面
    },
  });
  let goPay = useRequest(bmwService.goPay, {
    manual: true, onSuccess: (data: any) => {
      switch (data?.type) {
        case 'redirect': {
          window.location.href = data?.redirect;
          break;
        }
        case 'qrCode': {
          Modal.info({
            title: '扫码支付',
            content: (<div className={styles.qrcode}><Avatar size={140} shape='square' src={data?.qrCode} /></div>),
          });
          break;
        }
        default: {
          message.error(`暂不支持:${data?.type}`);
        }
      }
    },
  });
  let closeTrade = useRequest(bmwService.closeTrade, { manual: true });

  useEffect(() => {
    // getCashier.run({ u: params?.u });
    let interval = setInterval(() => getCashier.run({ u: params?.u }), 2.5 * 1000);
    return () => clearInterval(interval);
  }, [params?.u]);

  if (!data && getCashier?.loading) {
    return <Spin />;
  }
  let payTypes = (data?.payTypes || []).map((item: any, index: number) => ({
    ...item,
    checked: check === index,
  }));

  let checked = payTypes.filter(({ checked }: any) => checked);

  let onSubmit = () => {
    goPay.run({ tradeOrderId: data?.tradeOrderId, paySceneId: data?.paySceneId, payType: checked[0]?.payType });
  };

  let onClose = () => {
    Modal.confirm({
      title: '确认关闭交易?',
      onOk: () => closeTrade.run({ tradeOrderId: data?.tradeOrderId }),
    });
  };

  return (<div className={styles.cashier}>
    <div className={styles.info}>
      <div className={styles.head}>
        <div className={styles.image}>
          <Avatar shape={'square'} size={100} src={data?.imageUrl} icon={<TrophyOutlined />} />
        </div>
        <div className={styles.order}>
          <TitleSpec title='商户名称'>{data?.accessMchName}</TitleSpec>
          <TitleSpec title='商品名称'>{data?.orderTitle}</TitleSpec>
          <TitleSpec title='交易金额'> <Money value={data?.tradeAmt} /></TitleSpec>
          <TitleSpec title='付款账号'> {data?.userName}</TitleSpec>
          {more && (<>
            <TitleSpec title='订单描述'>{data?.orderDesc}</TitleSpec>
            <TitleSpec title='购买时间'> {data?.createdAt}</TitleSpec>
            <TitleSpec title='关单时间'>{data?.planCloseAt}</TitleSpec>
            <TitleSpec title='交易号'>{data?.tradeNo}</TitleSpec>
          </>)}
          <a className={styles.toolbar} onClick={() => setMore(!more)}>{more ? '收起' : '展开'}</a>
        </div>
      </div>
    </div>
    <div className={styles.methods}>
      <div className={styles.title}>支付方式</div>
      <div className={styles.options}>
        <Row gutter={[10, 10]}>
          {payTypes.map((item: any, index: number) => <Col md={6} xs={24}>
            <RadioOption src={item.imageUrl} title={item.title} checked={item.checked}
                         onClick={() => setCheck(index)} />
          </Col>)}
        </Row>
      </div>
      <div className={styles.methodsToolbar}>
        <Space>
          <a rel='noopener noreferrer' onClick={onClose}>取消交易</a>
          <Button type='primary' onClick={onSubmit}>确认支付</Button>
        </Space>
      </div>
    </div>
  </div>);
};

export default Index;
