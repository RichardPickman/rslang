import React from 'react';
import { Outlet } from 'react-router-dom';
import UserDictNavigation from '../UserDictNav/index';
import { useAppSelector } from '../../../hooks/useAppSelector';

const UserDictionary = () => {
  const { dictionarySections } = useAppSelector((state) => state.textbook);
  return (
      <>
        <UserDictNavigation navItems={dictionarySections} />
        <Outlet />
      </>
  );
};

export default UserDictionary;