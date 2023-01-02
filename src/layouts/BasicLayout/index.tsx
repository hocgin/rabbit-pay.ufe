import styles from './index.less';
import React from 'react';
import {Footer, Header} from '@hocgin/ui';
import {Theme} from '@/components';

const BasicLayout: React.FC<{}> = ({children}: any) => {
  return (<Theme>
    <div className={styles.normal}>
      <Header logo={<Header.TextLogo title={'收银台'}/>}/>
      <div style={{flex: '1 1'}}>{children}</div>
      <Footer/>
    </div>
  </Theme>);
};
export default BasicLayout;
