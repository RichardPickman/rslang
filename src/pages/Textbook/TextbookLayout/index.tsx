import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Layout from '../../../components/Layout';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RouteNames } from '../../../router';

const TextbookLayout = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <Layout>
      <>
        <Link to={RouteNames.TEXTBOOK}>Учебник</Link>
        {isAuth && <Link to={RouteNames.USER_DICTIONATY}><span>{' | '}</span>Мой словарь</Link>}
        <Outlet />
      </>
    </Layout>
  );
};

export default TextbookLayout;