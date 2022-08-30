import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';

const WordsStatistics = () => {
  const { learnedWords, failedWords } = useAppSelector((state) => state.game);
  return (
    <div>
      <h3>Ошибок{' '}<span>{failedWords.length}</span></h3>
      {failedWords.map((word) => {
        return <div key={word.id}>
          <p>{word.word}{' '}<span>{word.wordTranslate}</span></p>
        </div>;
      })}

      <h3>Знаю{' '}<span>{learnedWords.length}</span></h3>
      {learnedWords.map((word) => {
        return <div key={word.id}>
          <p>{word.word}{' '}<span>{word.wordTranslate}</span></p>
        </div>;
      })}
    </div>
  );
};

export default WordsStatistics;