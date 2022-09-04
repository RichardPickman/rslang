import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Intro from '../Intro';
import Main from '../Main';
import Wrapper from '../Wrapper';
import styles from './styles.module.scss';

interface LayoutProps {
  children: JSX.Element,
}
const Layout = ({ children }: LayoutProps) => {
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