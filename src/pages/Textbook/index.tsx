import React from 'react';
import TextbookNavigation from './TextbookNavigation';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

const Textbook = () => {
  const { units } = useAppSelector((state) => state.textbook);

  return (
    <>
      <TextbookNavigation units={units} />
      <Outlet />
    </>
  );
};

export default Textbook;