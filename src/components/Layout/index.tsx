import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import styles from './styles.module.scss';

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;