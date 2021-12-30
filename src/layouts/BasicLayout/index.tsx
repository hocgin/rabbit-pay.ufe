import styles from './index.less';
import React from 'react';
import { ConfigProvider } from 'antd';
import { Footer, Header } from '@hocgin/ui';
import zhCN from 'antd/lib/locale/zh_CN';


const BasicLayout: React.FC<{}> = (props, ref) => {
  return (<ConfigProvider locale={zhCN}>
    <div className={styles.normal}>
      <Header title='收银台' />
      {props.children}
      <Footer />
    </div>
  </ConfigProvider>);
};
export default BasicLayout;
