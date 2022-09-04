import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Intro from '../Intro';
import Main from '../Main';
import Wrapper from '../Wrapper';
import styles from './styles.module.scss';

interface LayoutProps {
  children: JSX.Element,
  title: string,
}
const LayoutWithIntro = ({ title, children }: LayoutProps) => {
  return (
    <Wrapper>
      <>
        <Header />
        <Intro title={title}/>
        <Main>{children}</Main>
        <Footer />
      </>
    </Wrapper>
  );
};

export default LayoutWithIntro;