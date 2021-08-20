import styles from './index.less';
import { Footer, Header } from '@hocgin/ui';

function BasicLayout(props) {
  return (<div className={styles.normal}>
    <Header />
    {props.children}
    <Footer />
  </div>);
}

export default BasicLayout;
