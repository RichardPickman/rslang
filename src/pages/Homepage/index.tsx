import React from 'react';
import Layout from '../../components/Layout';
import Hero from '../../components/forHomepage/Hero';
import Promo from '../../components/forHomepage/Promo';
import About from '../../components/forHomepage/About'

const Homepage = () => {
  return (
    <Layout>
      <>
        <Hero />
        <Promo />
        <About />
      </>
    </Layout>
  );
};

export default Homepage;