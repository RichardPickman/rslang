import React from 'react';
import Layout from '../../components/Layout';
import Hero from '../../components/forHomepage/Hero';
import Promo from '../../components/forHomepage/Promo';

const Homepage = () => {
  return (
    <Layout>
      <>
        <Hero />
        <Promo />
      </>
    </Layout>
  );
};

export default Homepage;