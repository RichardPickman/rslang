import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteNames } from '.';
import { NavigateState, TransitionEnum } from '../types/types';
import LocalStorage from './../services/localStorage';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const state:NavigateState = {mode: TransitionEnum.REDIRECTION, location: location.pathname};
  const user = LocalStorage.getItem('user');
  return (<>
    {user ?
      children :
      <Navigate to={RouteNames.AUTHORIZATION}
        state={state}
        replace />}
  </>
  );
};

export default PrivateRoute;