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
import { useHandleUserWords } from './useHandleUserWords';
import OnStartPage from './OnStartPage';

const SprintGame = () => {
  const { state } = useLocation();
  const { phase } = useAppSelector((state) => state.game);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { setPhaseAction } = useActions();  
  const [hasBeenFinished, setHasBeenFinished] = useState(false);
  const { reset } = useActions();
  const location = useLocation();
  
  // useHandleUserWords({ phase, isAuth });
  useEffect(() => {
    reset();
    setPhaseAction(GamePhase.INIT);
  }, [location]);

  const onFinish = () => {
    setPhaseAction(GamePhase.RUNNING);
  }
  useEffect(() => {
    if (phase === GamePhase.INIT) {
      reset();
    }
  }, [phase]);

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