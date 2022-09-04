import React from 'react';
import Chart from '../../components/ui/Chart';
import { StatItem } from '../../types/types';
import styles from './styles.module.scss';

interface TodayStatisticsProps {
  stats: StatItem;
}

const TodayStatistics = ({ stats }: TodayStatisticsProps) => {
  return (
      <ul className={`${styles['list']} ${styles['list-today-statistics']}`}>
        <li>
          <Chart from={0} to={stats.newWords.length} type={''} description={'новых слов'} />
        </li>
        <li>
          <Chart from={0} to={stats.percentage} type={'percent'} description={'правильных ответов'} />
        </li>
      </ul>
  );
};

export default TodayStatistics;