import React from 'react';
import styles from './styles.module.scss';

const Wrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

export default Wrapper;