import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { IWord } from '../../types/types';
import { useAppSelector } from './../../store/index';
import { useDispatch } from 'react-redux';
import TextbookNavigation from './TextbookNavigation';
import { Outlet } from 'react-router-dom';

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