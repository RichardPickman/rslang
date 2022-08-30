import { Segmented } from 'antd';
import Card from 'antd/lib/card/Card';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { RouteNames } from '../../../router';
import { GamePhase } from '../../../types/types';
import LearnedWords from './WordsStatistics';
import ResultCard from './ResultCard';
import { handleUserWords } from './useHandleUserWords';
import { useAppSelector } from '../../../hooks/useAppSelector';

const GameStatistics = () => {
  const [value, setValue] = useState<string | number>('Результат');
  const { setPhaseAction } = useActions();
  const navigate = useNavigate();
  const { phase } = useAppSelector((state) => state.game);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { learnedWords, failedWords } = useAppSelector((state) => state.game);
  const displayedWords = [...learnedWords, ...failedWords];
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    handleUserWords({ phase, isAuth, displayedWords, user, learnedWords });
  }, [])
  
  let shouldChangePhase = true;

  const changePage = (value: string | number) => {
    shouldChangePhase = false;
    setValue(value);
  }

  const startNewGame = () => {
    setPhaseAction(GamePhase.INIT);
  }

  const redirectToTextbook = () => {
    navigate(`${RouteNames.TEXTBOOK}`);
  }

  useEffect(() => () => {
    if (shouldChangePhase) {
      setPhaseAction(GamePhase.INIT);
    }
  });

  useEffect(() => () => {
    if (shouldChangePhase) {
      setPhaseAction(GamePhase.INIT);
    }
  });
  console.log('PHASE', phase);
  return (
    <div>
      <Card style={{ margin: '0 auto', width: '60%' }}>
        <Segmented options={['Результат', 'Посмотреть слова']} value={value} onChange={(value) => changePage(value)} />
        {value === 'Результат' && <ResultCard />}
        {value === 'Посмотреть слова' && <LearnedWords />}
        <div>
          <button type="button" onClick={startNewGame}>Новая игра</button>
          <button type="button" onClick={redirectToTextbook}>Перейти в учебник</button>
        </div>
      </Card>
    </div>
  );
};

export default GameStatistics;