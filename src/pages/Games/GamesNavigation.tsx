import styles from './styles.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Games } from '../../data/constants';
import { RouteNames } from '../../router';
import { GameMode } from '../../types/types';
import { Card } from 'antd';
import audiocall_promo from '../../assets/img/background/audiocall-promo.jpg'
import sprint_promo from '../../assets/img/background/sprint-promo.jpg'

const GamesNavigation = ({ state }: { state: GameMode }) => {
  return (
    <div className={`${styles['nav']}`}>
      {Games.map((game) => {
        // return <li className={`${styles['nav__item']}`} key={game.id}>
        //   <p className={`${styles['game__title']}`}>{game.title}</p>
        //   <p className={`${styles['game__description']}`}>{game.description}</p>
        //   <Link
        //     to={`${RouteNames.GAMES}/${game.link}`}
        //     state={state}
        //   >
        //     Поехали!
        //   </Link>
        // </li>
         return (
           <Link
            to={`${RouteNames.GAMES}/${game.link}`}
            state={state}
          >
            <Card
              hoverable
              style={{ width: 320, background: '#ff6666' }}
              cover={
                <img
                  alt='img'
                  src={game.id === 0 ? audiocall_promo : sprint_promo}
                />
              }
            >
              <Card.Meta
                title={game.title}
                description={game.description}
              />
            </Card>
          </Link>
         )
      })}

    </div>
  );
};

export default GamesNavigation;