import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';

const WordsStatistics = () => {
  const { learnedWords, failedWords } = useAppSelector((state) => state.game);
  return (
    <div className={'words-statistics'}>
      <div className={'statistics__inner'}>
        <h3 className={'statistics__title'}>Ошибок{' '}<span className='statistics__number_failure'>{failedWords.length}</span></h3>
        {failedWords && failedWords.map((word) => {
          return <div key={word.id}>
            <p>{word.word}{' — '}<span>{word.wordTranslate}</span></p>
          </div>;
        })}

        <h3 className={'statistics__title'}>Знаю{' '}<span className='statistics__number_success'>{learnedWords.length}</span></h3>
        {learnedWords && learnedWords.map((word) => {
          return <div key={word.id}>
            <p>{word.word}{' — '}<span>{word.wordTranslate}</span></p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default WordsStatistics;