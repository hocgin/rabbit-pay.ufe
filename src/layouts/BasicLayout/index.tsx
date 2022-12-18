import styles from './index.less';
import React from 'react';
import {ConfigProvider} from 'antd';
import {Footer, Header} from '@hocgin/ui';
import zhCN from 'antd/lib/locale/zh_CN';

const BasicLayout: React.FC<{}> = ({children}) => {
  return (<ConfigProvider locale={zhCN}>
    <div className={styles.normal}>
      <Header logo={<Header.TextLogo title={'收银台'}/>}/>
      {children}
      <Footer/>
    </div>
  </ConfigProvider>);
};
export default BasicLayout;
