import React from 'react';
import { Games } from '../../../data/constants';
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { GamePhase } from '../../../types/types';
import { generateRandomWordsFromPage } from './utils';

const OnStartPage = () => {
  const { page, unit } = useAppSelector((state) => state.textbook);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { setPhaseAction, setGameWordsAction, setFetchedWordsAction } = useActions();
  const onBtnClick = () => {
    generateRandomWordsFromPage({ unit, page, isAuth, user, setFetchedWordsAction })
      .then((pairs) => {
        setGameWordsAction(pairs);
        setPhaseAction(GamePhase.STARTED);
      })
      .catch((error) => error);
  }

  return (
    <div className={'on-start'}>
      <div className={'rules'}>
        <p>{Games.find((game) => game.id === 1)?.rules}</p>
        <button className={`${'btn'} ${'btn_start'}`} type='button' onClick={onBtnClick}>Поехали!</button>
      </div>
    </div>
  );
};

export default OnStartPage;