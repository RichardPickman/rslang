import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { gameTimer } from '../../../data/constants';
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { GamePhase } from '../../../types/types';
import GameStatistics from './GameStatistics';
import GameWordCard from './GameWordCard';
import Timer from './Timer';

interface GamePageProps {
  setHasBeenFinished: Dispatch<SetStateAction<boolean>>,
}

const GamePage = ({ setHasBeenFinished }: GamePageProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { setPhaseAction } = useActions();
  const { gameWords,  points } = useAppSelector((state) => state.game);
  const onFinish = useMemo(() => {
    return () => {
      setCurrentWordIndex(0);
      setPhaseAction(GamePhase.FINISHED);
    }
  }, []);

  const memoizedTime = useMemo(() => gameTimer, []);
  const isArrEmpty = currentWordIndex === gameWords.length;

  return (
    <>
      <p>Очки: {points}</p>
      {isArrEmpty ? <GameStatistics/> : <>
        <Timer time={memoizedTime} onFinish={onFinish} />
        <GameWordCard word={gameWords[currentWordIndex]} setCurrentWordIndex={setCurrentWordIndex} />
      </>
      }
    </>
  );
};

export default GamePage;