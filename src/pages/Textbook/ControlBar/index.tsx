import React from 'react';
import { DisplayedWord, IUser } from '../../../types/types';
import styles from './styles.module.scss';
import DifficultWordSVG from '../../../assets/img/words/graduation-cap.svg';
import DeleteSVG from '../../../assets/img/words/delete-icon.svg';
import { IUserWord } from './../../../types/types';
import BulbOn from '../../../assets/img/words/bulb-on.svg';
import BulbOff from '../../../assets/img/words/bulb-off.svg';
import WordsActions from './../wordsActions';
import { getDictActionsType } from '../Dictionary/dictionaryActions';
import { useAppSelector } from '../../../hooks/useAppSelector';

interface ControlBar {
  word: DisplayedWord,
  dictActions: getDictActionsType,
}

const ControlBar = ({ word, dictActions }: ControlBar) => {
  const isDifficultValue = word.userWord?.optional?.isDifficult;
  const isDifficult = isDifficultValue ? JSON.parse(isDifficultValue.toLowerCase()) : false;
  const isLearnedValue = word.userWord?.optional?.isLearned;
  const isLearned = isLearnedValue ? JSON.parse(isLearnedValue.toLowerCase()) : false;
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles['control-bar']}>
      {
        isDifficult ?
          <button
            type="button"
            className={`${styles['btn']} ${styles['btn_delete']}`}
            title='Убрать из раздела "Сложные слова"'
            onClick={(e) => {
              e.stopPropagation();
              dictActions.removeFromDifficultWords({ id: word.word.id, word: word.word.word, user: user as IUser });
            }}
          >
            <img src={DeleteSVG} alt='delete icon' />
          </button>
          :
          <button
            type="button"
            className={`${styles['btn']} ${styles['btn_add']}`}
            title='Добавить в раздел "Сложные слова"'
            onClick={(e) => {
              e.stopPropagation();
              dictActions.addToDifficultWords({ id: word.word.id, word: word.word.word, user: user as IUser })
            }
            }
          >
            <img src={DifficultWordSVG} alt='graduation cap' />
          </button>
      }

      {
        isLearned ?
          <button
            type="button"
            className={`${styles['btn']} ${styles['btn_learned_delete']}`}
            title='Убрать из раздела "Изученные слова"'
            onClick={(e) => {
              e.stopPropagation();
              dictActions.removeFromLearnedWords({ id: word.word.id, word: word.word.word, user: user as IUser });
            }}
          >
            <img src={BulbOn} alt='bulb on' />
          </button>
          :
          <button
            type="button"
            className={`${styles['btn']} ${styles['btn_learned_add']}`}
            title='Добавить в раздел "Изученные слова"'
            onClick={(e) => {
              e.stopPropagation();
              dictActions.addToLearnedWords({ id: word.word.id, word: word.word.word, user: user as IUser });
            }}
          >
            <img src={BulbOff} alt='bulb off' />
          </button>
      }
    </div>
  );
};

export default ControlBar;