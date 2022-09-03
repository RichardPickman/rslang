import React from 'react';
import Layout from '../../components/Layout';
import Hero from '../../components/forHomepage/Hero';
import Promo from '../../components/forHomepage/Promo';
import About from '../../components/forHomepage/About'
import Work from '../../components/forHomepage/Work'
import Team from '../../components/forHomepage/Team'

const Homepage = () => {
  return (
    <Layout>
      <>
        <Hero />
        <Promo />
        <About />
        {/* <Work /> */}
        <Team />
      </>
    </Layout>
  );
};

export default Homepage;