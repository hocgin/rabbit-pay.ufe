import * as React from 'react';
import styles from './index.less';

const Index: React.FC<{ title: string, children?: any }> = ({ title, children }, ref) => {
  return <div className={styles.component}>
    <span className={styles.title}>{title}</span>
    <span className={styles.value}>{children}</span>
  </div>;
};

export default Index;
