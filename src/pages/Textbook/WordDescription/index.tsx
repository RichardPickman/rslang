import React from 'react';
import { DisplayedWord, IWord } from '../../../types/types';
import styles from './styles.module.scss';
import Audio from '../../../components/Audio';
import { useAppSelector } from './../../../hooks/useAppSelector';
import { Games } from '../../../data/constants';

interface WordDescriptionProps {
  selectedWord: DisplayedWord | null,
  context: AudioContext | null,
  imageSrc: string
  audioWord: AudioBuffer,
  audioMeaning: AudioBuffer,
  audioExample: AudioBuffer,
}

const WordDescription = ({
  selectedWord,
  context,
  imageSrc,
  audioWord,
  audioMeaning,
  audioExample
}: WordDescriptionProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  if (!selectedWord) return null;
  const textMeaning = selectedWord.word.textMeaning.replaceAll('<i>','').replaceAll('</i>','');
  const textExample = selectedWord.word.textExample.replaceAll('<b>','').replaceAll('</b>','');
  return (
    <div className={styles['word-description']}>
      <div className={styles['img-container']}>
        <img src={imageSrc} />
      </div>
      <h4 className={styles['item__word']}>{selectedWord.word.word}</h4>
      <p className={styles['item__translation']}>{selectedWord.word.wordTranslate}</p>
      <span className={styles['item__group']}>
        <p className={styles['item__transcription']}>{selectedWord.word.transcription}</p>
        <Audio buffer={audioWord} context={context} />
      </span>

      <h5 className={styles['item__section']}>Значение</h5>
      <span className={styles['item__group']}>
        <p className={styles['item__meaning']}>{textMeaning}</p>
        <Audio buffer={audioMeaning} context={context} />
      </span>

      <p className={styles['item__meaning_meaning']}>{selectedWord.word.textMeaningTranslate}</p>
      <h5 className={styles['item__section']}>Пример</h5>
      <span className={styles['item__group']}>
        <p className={styles['item__example']}>{textExample}</p>
        <Audio buffer={audioExample} context={context} />
      </span>
      <p className={styles['item__example_translation']}>{selectedWord.word.textExampleTranslate}</p>
      {isAuth && <>
        <h5 className={styles['item__section']}>Статистика по играм</h5>
        {Games.map((game) => {
          return (<div key={game.id}>
            <p className={styles['game__title']}>{game.title}</p>
            {selectedWord.userWord?.optional?.statistics?.sprint.attempts ?
              <p className={styles['game__points']}>{selectedWord.userWord?.optional?.statistics?.sprint.guessedNum}
                /{selectedWord.userWord?.optional?.statistics?.sprint.attempts}</p> :
              <p className={styles['game__points']}>0/0</p>
            }
          </div>)
        })}
      </>}
    </div>
  );
};

export default WordDescription;