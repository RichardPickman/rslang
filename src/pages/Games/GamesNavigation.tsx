import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../../components/Section';
import { Games } from '../../data/constants';
import { GameMode } from '../../types/types';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import PatternStars from '../../assets/img/patterns/img-stars.png';

const GamesNavigation = ({ state }: { state: GameMode }) => {
  return (
    <div className={`${styles['section-games']}`}>
      <motion.div
        className={`${styles['bg-items']}`}
        animate={{ rotate: 7 }}
        transition={{ repeat: Infinity, duration: 4, repeatType: 'mirror' }}
      />
      <img  className={`${styles['pattern-stars']}`} src={PatternStars} />
      <Section title={'Выбери игру'}>
        <>
          <ul className={`${styles['nav']}`}>
            {Games.map((game) => {
              return <li className={`${styles['nav__item']}`} key={game.id}>
                <p className={`${styles['game__title']}`}>{game.title}</p>
                <p className={`${styles['game__description']}`}>{game.description}</p>
                <Link
                  to={game.link}
                  state={state}
                >
                  Поехали!
                </Link>
              </li>
            })}
          </ul>
        </>
      </Section>
    </div>
  );
};

export default GamesNavigation;