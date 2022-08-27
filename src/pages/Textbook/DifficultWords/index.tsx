import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { IUser } from '../../../types/types';
import Dictionary from '../Dictionary';
import WordService from '../../../services/wordService';
import { IWord } from '../../../types/types';


const DifficultWords = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [words, setWords] = useState([] as IWord[]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isActualFetch = true;
    const fetchWords = async () => {
      setIsLoading(true);
      const wordsArr = await WordService.getAggregatedWords({
        userId: (user as IUser).id,
        token: (user as IUser).token,
        filter: `{"$and":[{"userWord.difficulty":"difficult"}]}`,
      });
      if (isActualFetch) {
        wordsArr.forEach((w) => w.isDifficult = true);
        setWords(wordsArr);
        setIsLoading(false);
      }
    }
    fetchWords();
    return () => {
      isActualFetch = false;
    }
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div>
      {
        words &&
        words.length > 0 &&
        <Dictionary words={words} />
      }
    </div>
  );
};

export default DifficultWords;
