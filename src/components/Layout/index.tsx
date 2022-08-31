import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import Wrapper from '../Wrapper';
import styles from './styles.module.scss';

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <Wrapper>
      <>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </>
    </Wrapper>
  );
};

export default Layout;