import React from 'react';
import { DisplayedWord } from '../../../types/types';
import styles from './styles.module.scss';
import ControlBar from '../ControlBar';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getDictActionsType } from '../Dictionary/dictionaryActions';

interface WordCardProps {
  word: DisplayedWord,
  selected: boolean,
  onCardClick: (word: DisplayedWord) => void,
  dictActions: getDictActionsType,
}
const WordCard = ({ word, onCardClick, selected, dictActions }: WordCardProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const isDifficultValue = word.userWord?.optional?.isDifficult;
  const isDifficult = !isAuth ? false :
    isDifficultValue ? JSON.parse(isDifficultValue.toLowerCase()) : false;

  const isLearnedValue = word.userWord?.optional?.isLearned;
  const isLearned = !isAuth ? false :
    isLearnedValue ? JSON.parse(isLearnedValue.toLowerCase()) : false;

  return (
    <div
      className={`
    ${styles.item} 
    ${selected && styles.item_selected}
    ${isDifficult && styles.item_difficult}
    ${isLearned && styles.item_learned}`}
      onClick={() => onCardClick(word)}>
      <p className={styles['item__word']}>{word.word.word}</p>
      <p className={styles['item__translation']}>{word.word.wordTranslate}</p>
      {isAuth && <ControlBar
        word={word}
        dictActions={dictActions}
      />
      }
    </div>
  );
};

export default WordCard;