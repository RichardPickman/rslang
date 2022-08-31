import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { DisplayedWord, IUser } from '../../../types/types';
import Dictionary from '../Dictionary';
import WordService from '../../../services/wordService';
import { learnedWordsFilter } from '../../../data/constants';


const LearnedWords = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [words, setWords] = useState([] as DisplayedWord[]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isActualFetch = true;
    const fetchWords = async () => {
      setIsLoading(true);
      const wordsArr = await WordService.getAggregatedWords({
        userId: (user as IUser).id,
        token: (user as IUser).token,
        filter: learnedWordsFilter,
      });
      const displayedWords: DisplayedWord[] = wordsArr.map((w) => {
        const {userWord, ...rest} = w;
        return {
          word: { ...rest, id: w._id},
          userWord: {wordId: w._id, ...w.userWord},
        }
      });
      if (isActualFetch) {
        setWords(displayedWords);
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

export default LearnedWords;
