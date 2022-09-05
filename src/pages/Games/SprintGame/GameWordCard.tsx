import React, { Dispatch, SetStateAction, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { GameWord, IWord } from '../../../types/types';
import { pointsPerWord } from './../../../data/constants';
import correctSound from '../../../assets/sounds/correct-answer.wav';
import incorrectSound from '../../../assets/sounds/incorrect-answer.wav';
import './styles.scss';

interface WordCardProps {
  word: GameWord,
  setCurrentWordIndex: Dispatch<SetStateAction<number>>,
}

enum ButtonType {
  RIGHT = 'right',
  WRONG = 'wrong',
}

const GameWordCard = ({ word, setCurrentWordIndex }: WordCardProps) => {
  const { points, fetchedWords, maxsequence } = useAppSelector((state) => state.game);
  const { setPointsAction, setLearnedWord, setFailedWord, setMaxSequence } = useActions();
  const [sequence, setSequence] = useState(0);


  const onSuccess = () => {
    const audioCorrect = new Audio(correctSound);
    audioCorrect.pause();
    audioCorrect.play();
    setPointsAction(points + pointsPerWord);
    setLearnedWord(fetchedWords.find((w) => w.id === word.id) as IWord);
    if (maxsequence < (sequence + 1)) {
      setMaxSequence(sequence + 1);
    }
    setSequence((prevState) => ++prevState);
  }

  const onFailure = () => {
    const audioIncorrect = new Audio(incorrectSound)
    audioIncorrect.pause();
    audioIncorrect.play();
    setFailedWord(fetchedWords.find((w) => w.id === word.id) as IWord);
    if (maxsequence < sequence) {
      setMaxSequence(sequence);
    }
    setSequence(0);
  }

  const onbtnClick = (btn: ButtonType) => {
    if (btn === ButtonType.WRONG) {
      console.log('word', word);
      !word.isRight ? onSuccess() : onFailure();
    }
    if (btn === ButtonType.RIGHT) {
      word.isRight ? onSuccess() : onFailure();
    }
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
  }
  return (
    <div className={'card'}>
      <h3 className={'card__word'}>{word.word}</h3>
      <h4 className={'card__translation'}>{word.translation}</h4>
      <div className={'card__controls'}>
        <button type="button" className={`${'btn'} ${'btn_answer'}`}
          onClick={() => onbtnClick(ButtonType.WRONG)}>Неверно</button>
        <button type="button" className={`${'btn'} ${'btn_answer'}`}
          onClick={() => onbtnClick(ButtonType.RIGHT)}>Верно</button>
      </div>
    </div>
  );
};

export default GameWordCard;
