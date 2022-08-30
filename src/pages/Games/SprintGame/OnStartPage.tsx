import React from 'react';
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { GamePhase } from '../../../types/types';
import { generateRandomWords, generateRandomWordsFromPage } from './utils';

const OnStartPage = () => {
  const { page, unit } = useAppSelector((state) => state.textbook);
  const { setPhaseAction, setGameWordsAction, setWordsAction } = useActions();
  const onBtnClick = () => {
    generateRandomWordsFromPage({unit, page, setWordsAction})
    .then((pairs) => {
      setGameWordsAction(pairs);
      setPhaseAction(GamePhase.STARTED);
    })
    .catch((error) => console.log(error));
  }

  return (
    <div>
      <p>Правила игры бла-бла-бла</p>
      <button type='button' onClick={onBtnClick}>Поехали!</button>
    </div>
  );
};

export default OnStartPage;