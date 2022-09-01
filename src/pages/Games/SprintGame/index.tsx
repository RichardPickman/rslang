import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { GameMode, GamePhase } from '../../../types/types';
import Levels from './Levels';
import { useAppSelector } from '../../../hooks/useAppSelector';
import Timer from './Timer';
import GamePage from './GamePage';
import { useActions } from '../../../hooks/useActions';
import GameStatistics from './GameStatistics';
import { Card } from 'antd';
import OnStartPage from './OnStartPage';
import getStatisticsActions from './StatisticsActions';

const SprintGame = () => {
  const { state } = useLocation();
  const { phase, dailyStats, gameWords, date } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);
  const { setPhaseAction, setDailyStatistics, setUsedWords } = useActions();
  const [hasBeenFinished, setHasBeenFinished] = useState(false);
  const { reset } = useActions();
  const location = useLocation();
  const statsActions = getStatisticsActions({ user, gameWords, date, dailyStats, setDailyStatistics, setUsedWords });
  const onFinish = () => setPhaseAction(GamePhase.RUNNING);

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
    <>
      <button type="button" onClick={() => setPhaseAction(GamePhase.INIT)}>Новая игра</button>
      {phase === GamePhase.INIT && (state === GameMode.MENU_GAME ? <Levels /> : <OnStartPage />)}
      {phase === GamePhase.STARTED &&
        <Card style={{ margin: 'auto', width: '10%' }}>
          <Timer time={6000} onFinish={onFinish} />
          <p>Приготовься!</p>
        </Card>
      }
      {phase === GamePhase.RUNNING && <GamePage setHasBeenFinished={setHasBeenFinished} />}
      {phase === GamePhase.FINISHED && <GameStatistics />}
    </>
  );
};

export default SprintGame;