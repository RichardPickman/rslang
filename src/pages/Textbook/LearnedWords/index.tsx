import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { DisplayedWord, IUser } from '../../../types/types';
import Dictionary from '../Dictionary';
import WordService from '../../../services/wordService';
import { learnedWordsFilter } from '../../../data/constants';
import Container from '../../../components/Container';
import SectionTitle from '../../../components/SectionTitle';
import styles from './styles.module.scss';
import Section from '../../../components/Section';


const LearnedWords = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [words, setWords] = useState([] as DisplayedWord[]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isActualFetch = true;
    const fetchWords = async () => {
      setIsLoading(true);
      try {
        const wordsArr = await WordService.getAggregatedWords({
          userId: (user as IUser).id,
          token: (user as IUser).token,
          filter: learnedWordsFilter,
        });
        const displayedWords: DisplayedWord[] = wordsArr.map((w) => {
          const { userWord, ...rest } = w;
          return {
            word: { ...rest, id: w._id },
            userWord: { wordId: w._id, ...w.userWord },
          }
        });
        if (isActualFetch) {
          setWords(displayedWords);
          setIsLoading(false);
        }
      } catch {
        setIsLoading(false);
      }
    }
    fetchWords();
    return () => {
      isActualFetch = false;
    }
  }, []);

  return (
    <Section title={'Мои изученные слова'} >
      <>
        {isLoading ? <Loader /> :
          (words &&
            words.length > 0) ?
            <Dictionary words={words} /> :
            <p>Слова не найдены</p>
        }
      </>
    </Section>
  );
};

export default LearnedWords;
