import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Main from '../../components/Main';
import Wrapper from '../../components/Wrapper';
import { RouteNames } from '../../router';
import Header from '../../components/Header/index';
import styles from './styles.module.scss';

const Games = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <>
        <Header />
        <Main>
            <Outlet />
        </Main>
        {location.pathname === RouteNames.GAMES && <Footer />}
      </>
    </Wrapper>
  );
};

export default Games;