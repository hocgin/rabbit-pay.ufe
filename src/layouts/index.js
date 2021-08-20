import styles from './index.less';
import { Footer, Header } from '@hocgin/ui';

function BasicLayout(props) {
  return (<div className={styles.normal}>
    <div className={styles.page}>
      <Header />
      {props.children}
      <Footer />
    </div>
  </div>);
}

export default BasicLayout;
