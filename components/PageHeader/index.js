import React from 'react';
import styles from '../../styles/Home.module.css';

export default function PageHeader({ children }) {
  return <div className={styles.tableHeader}>{children}</div>;
}
