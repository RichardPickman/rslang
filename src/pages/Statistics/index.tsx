import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import LayoutWithIntro from '../../components/LayoutWithIntro';
import Section from './../../components/Section/index';
import styles from './styles.module.scss';
import { useAppSelector } from './../../hooks/useAppSelector';
import getStatisticsActions from './StatisticsActions';
import { IUser, StatItem } from '../../types/types';
import Loader from '../../components/Loader';
import TodayStatistics from './TodayStatistics';
import GameStatistics from './GameStatistics';
import Chart from '../../components/ui/Chart';
import patternBulb from '../../assets/img/patterns/program_details1.png';
import patternLines from '../../assets/img/patterns/program_details2.png';
import SectionTitle from '../../components/SectionTitle';
import Container from '../../components/Container';

const initStats: StatItem = {
  newWords: [],
  percentage: 0,
  sequence: 0,
  gameWordsNum: 0,
  guessedWordsNum: 0,
}

const Statistics = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { date } = useAppSelector((state) => state.game);
  const [todayStats, setTodayStats] = useState(initStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    const statisticsActions = getStatisticsActions(user);
    const fetchStatistics = () => {
      statisticsActions.getSprinStatistics()
        .then((stats) => {
          const today = stats?.daily[`${date}`];
          if (today) {
            setTodayStats(today);
          }
        })
        .catch((error) => {})
        .finally(() => setIsLoading(false));
    };
    fetchStatistics();
  }, [user])
  return (
    <LayoutWithIntro title={'Статистика'}>
      <div className={styles['section-statistics']}>
        <img src={patternBulb} alt="" className={styles["pattern-bulb"]} />
        {!isLoading ? <>
          <Container>
            <SectionTitle title='Статистика за сегодня' />
          </Container>
          <div className={styles['tape']}>
            <Container>
              <TodayStatistics stats={todayStats} />
            </Container>
          </div>
          <Section title='Статистика по играм'>
            <GameStatistics todayStats={todayStats} />
          </Section>
        </> :
          <Loader />
        }
      </div>
    </LayoutWithIntro >
  );
};

export default Statistics;
