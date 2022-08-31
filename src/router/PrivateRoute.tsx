import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteNames } from '.';
import { NavigateState, TransitionEnum } from '../types/types';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const state:NavigateState = {mode: TransitionEnum.REDIRECTION, location: location.pathname};
  return (<>
    {isAuth ?
      children :
      <Navigate to={RouteNames.AUTHORIZATION}
        state={state}
        replace />}
  </>
  );
};

export default PrivateRoute;