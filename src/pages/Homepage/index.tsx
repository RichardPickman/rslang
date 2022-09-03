import React from "react";
import Layout from "../../components/Layout";
import Hero from "../../components/forHomepage/Hero";
import Promo from "../../components/forHomepage/Promo";
import About from "../../components/forHomepage/About";
import Team from "../../components/forHomepage/Team";

const Homepage = () => {
  return (
    <Layout>
      <>
        <Hero />
        <Promo />
        <About />
        <Team />
      </>
    </Layout>
  );
};

export default Homepage;
