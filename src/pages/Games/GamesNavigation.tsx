import React from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router';
import { GameMode } from '../../types/types';

const GamesNavigation = ({state}: {state: GameMode}) => {
  return (
    <>
    <div>
      <Link 
      to={`${RouteNames.GAMES}/${RouteNames.AUDIOCALL_GAME}`}
      state={state}
      >Аудиовызов</Link>
    </div>
    <div>
      <Link 
      to={`${RouteNames.GAMES}/${RouteNames.SPRINT_GAME}`}
      state={state}
      >Спринт</Link>
    </div>
    </>
  );
};

export default GamesNavigation;