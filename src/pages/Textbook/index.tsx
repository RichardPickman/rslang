import React from 'react';
import TextbookNavigation from './TextbookNavigation';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const Textbook = () => {

  return (
    <>  
      <Outlet />
    </>
  );
};

export default Textbook;