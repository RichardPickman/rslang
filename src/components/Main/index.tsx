import React from 'react';
import Container from '../Container';
import styles from './styles.module.scss';

const Main = ({ children }: { children: JSX.Element }) => {
  return (
    <main className={styles.main}>
        {children}
    </main>
  );
};

export default Main;