import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { GameWord, IWord } from '../../../types/types';
import styles from './styles.module.scss';
import { pointsPerWord } from './../../../data/constants';
import correctSound from '../../../assets/sounds/correct-answer.wav';
import incorrectSound from '../../../assets/sounds/incorrect-answer.wav';

interface WordCardProps {
  word: GameWord,
  setCurrentWordIndex: Dispatch<SetStateAction<number>>,
}

enum ButtonType {
  RIGHT = 'right',
  WRONG = 'wrong',
}

const GameWordCard = ({ word, setCurrentWordIndex }: WordCardProps) => {
  const { points, words, maxsequence } = useAppSelector((state) => state.game);
  const { setPointsAction, setLearnedWord, setFailedWord, setMaxSequence } = useActions();
  const [sequence, setSequence] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === Number('37')) {
      onbtnClick(ButtonType.WRONG)
    }
    if (e.keyCode === Number('39')) {
      onbtnClick(ButtonType.RIGHT)
    }
  }

  useEffect(() => {
    document.addEventListener<"keydown">('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const onSuccess = () => {
    const audioCorrect = new Audio(correctSound);
    audioCorrect.pause();
    audioCorrect.play();
    setPointsAction(points + pointsPerWord);
    setLearnedWord(words.find((w) => w.id === word.id) as IWord);
    if (maxsequence < (sequence + 1)) {
      setMaxSequence(sequence + 1);
    }
    setSequence((prevState) => ++prevState);
  }

  const onFailure = () => {
    const audioIncorrect = new Audio(incorrectSound)
    audioIncorrect.pause();
    audioIncorrect.play();
    setFailedWord(words.find((w) => w.id === word.id) as IWord);
    if (maxsequence < sequence) {
      setMaxSequence(sequence);
    }
    setSequence(0);
  }

  const onbtnClick = (btn: ButtonType) => {
    if (btn === ButtonType.WRONG) {
      !word.isRight ? onSuccess() : onFailure();
    }
    if (btn === ButtonType.RIGHT) {
      word.isRight ? onSuccess() : onFailure();
    }
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
  }
  return (
    <div className={styles.card}>
      <h3 className={styles.card__word}>{word.word}</h3>
      <h4 className={styles.card__translation}>{word.translation}</h4>
      <button type="button" onClick={() => onbtnClick(ButtonType.WRONG)}>Неверно</button>
      <button type="button" onClick={() => onbtnClick(ButtonType.RIGHT)}>Верно</button>
    </div>
  );
};

export default GameWordCard;
