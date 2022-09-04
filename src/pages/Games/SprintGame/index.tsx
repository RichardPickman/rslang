import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { GameMode, GamePhase } from '../../../types/types';
import Levels from './Levels';
import { useAppSelector } from '../../../hooks/useAppSelector';
import Timer from './Timer';
import GamePage from './GamePage';
import { useActions } from '../../../hooks/useActions';
import GameStatistics from './GameStatistics';
import OnStartPage from './OnStartPage';
import getStatisticsActions from './StatisticsActions';
import './styles.scss';
import SparkleAnimation from '../../../components/SparkleAnimation';

const SprintGame = () => {
  const { state } = useLocation();
  const { phase, dailyStats, gameWords, date } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);
  const { setPhaseAction, setDailyStatistics, setUsedWords } = useActions();
  const [hasBeenFinished, setHasBeenFinished] = useState(false);
  const { reset } = useActions();
  const location = useLocation();
  const statsActions = getStatisticsActions({ user, gameWords, date, dailyStats, setDailyStatistics, setUsedWords });
  const onFinish = () => {
    setPhaseAction(GamePhase.RUNNING);
  };

  const init = () => {
    if (!user) return;
    statsActions.init();
  };

  useEffect(() => {
    reset();
    setPhaseAction(GamePhase.INIT);
  }, [location]);


  useEffect(() => {
    if (phase === GamePhase.INIT) {
      reset();
    }
  }, [phase]);

  useEffect(() => init(), []);

  if (hasBeenFinished) {
    setPhaseAction(GamePhase.INIT);
  }

  return (
    <section className={'section-sprint-game'}>
      <SparkleAnimation />
      <button type="button" className={`${'btn'} ${'btn_new-game'}`} onClick={() => setPhaseAction(GamePhase.INIT)}>Новая игра</button>
      {phase === GamePhase.INIT && (state === GameMode.MENU_GAME ? <Levels /> : <OnStartPage />)}
      {phase === GamePhase.STARTED &&
        <div className='timer-container'>
          <Timer time={6000} onFinish={onFinish} />
          <p className='timer-text'>Приготовься!</p>
        </div>
      }
      {phase === GamePhase.RUNNING && <GamePage setHasBeenFinished={setHasBeenFinished} />}
      {phase === GamePhase.FINISHED && <GameStatistics />}
    </section>
  );
};

export default SprintGame;