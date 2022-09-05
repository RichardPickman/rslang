import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Main from '../../components/Main';
import Wrapper from '../../components/Wrapper';
import { RouteNames } from '../../router';
import Header from '../../components/Header/index';
import Intro from '../../components/Intro';

const Games = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <>
        <Header />
        {location.pathname === RouteNames.GAMES &&  <Intro title={'Игры'}/>}       
        <Main>
            <Outlet />
        </Main>
        {location.pathname === RouteNames.GAMES && <Footer />}
      </>
    </Wrapper>
  );
};

export default Games;