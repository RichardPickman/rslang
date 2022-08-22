import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import TextbookNavigation from './TextbookNavigation';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

const Textbook = () => {
  const { units }  = useAppSelector((state) => state.textbook);
  useEffect(() => {
    
  }, []);

  return (
    <Layout>
      <>
        <p>Textbook</p>
        <TextbookNavigation units={units}/>        
        <Outlet />
      </>
    </Layout>
  );
};

export default Textbook;