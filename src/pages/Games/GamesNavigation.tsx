import React from 'react';
import { Link } from 'react-router-dom';
import { Games } from '../../data/constants';
import { RouteNames } from '../../router';
import { GameMode } from '../../types/types';
import styles from './styles.module.scss';

const GamesNavigation = ({ state }: { state: GameMode }) => {
  return (
    <ul className={`${styles['nav']}`}>
      {Games.map((game) => {
        return <li className={`${styles['nav__item']}`} key={game.id}>
          <p className={`${styles['game__title']}`}>{game.title}</p>
          <p className={`${styles['game__description']}`}>{game.description}</p>
          <Link
            to={`${RouteNames.GAMES}/${RouteNames.SPRINT_GAME}`}
            state={state}
          >
            Поехали!
          </Link>
        </li>
      })}

    </ul>
  );
};

export default GamesNavigation;