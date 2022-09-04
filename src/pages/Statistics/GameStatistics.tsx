import React from 'react';
import { StatItem } from '../../types/types';
import styles from './styles.module.scss';

interface GameStatisticsProps {
  todayStats: StatItem,
}

const GameStatistics = ({todayStats}: GameStatisticsProps) => {
  return (
    <ul className={`${styles['list']} ${styles['list-game']}`}>
    <li className={`${styles['list__item']}`}>
      <h3 className={`${styles['item__title']}`}>Спринт</h3>
      <div className={`${styles['item__content']}`}>
        <ul className={`${styles['list']} ${styles['list-game-statistics']}`}>
          <li className={`${styles['statistics__item']}`}><span className={`${styles['statistics-number']}`}>{todayStats.newWords.length}</span> новых слов</li>
          <li className={`${styles['statistics__item']}`}><span className={`${styles['statistics-number']}`}>{todayStats.percentage}%</span> правильных ответов</li>
          <li className={`${styles['statistics__item']}`}><span className={`${styles['statistics-number']}`}>{todayStats.sequence}</span> правильно отвеченных подряд вопросов</li>
        </ul>
      </div>
    </li>
  </ul>
  );
};

export default GameStatistics;