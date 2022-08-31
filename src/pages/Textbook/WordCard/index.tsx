import React from 'react';
import { DisplayedWord, IWord } from '../../../types/types';
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
  const isDifficult = isDifficultValue ? JSON.parse(isDifficultValue.toLowerCase()) : false;
  return (
    <div 
    className={`
    ${styles.item} 
    ${selected && styles.item_selected}
    ${isDifficult && styles.item_difficult}`} 
    onClick={() => onCardClick(word)}>
      <p>{word.word.word}</p>
      <p>{word.word.wordTranslate}</p>
      {isAuth && <ControlBar
        word={word}
        dictActions={dictActions}
 />
      }
    </div>
  );
};

export default WordCard;