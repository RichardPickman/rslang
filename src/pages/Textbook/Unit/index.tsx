import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomPagination from '../../../components/ui/Pagination';
import TextbookService from '../../../services/textbookService';
import { IWord } from '../../../types/types';
import Dictionary from '../Dictionary';
import { wordsPerUnit } from '../../../data/constants';
import { wordsPerPage } from '../../../data/constants';
import Loader from '../../../components/Loader';

const Unit = () => {
  const { id } = useParams<string>();
  const [words, setWords] = useState() as [IWord[], Dispatch<SetStateAction<IWord[]>>];
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [id])

  useEffect(() => {
    let isActualFetch = true;
    const fetchWords = async () => {
      setIsLoading(true);     
      const wordsArr = await TextbookService.getWords({ group: (Number(id) - 1).toString(), page: (currentPage - 1).toString() });
      if (isActualFetch) {
        setWords(wordsArr);
        setIsLoading(false);
      }
    }
    fetchWords();
    return () => {
      isActualFetch = false;
    }
  }, [id, currentPage]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  }
  if (isLoading) return <Loader />;

  return (
    <div>
      <p>Unit {id}</p>
      {
        words && <>
          <CustomPagination
            total={wordsPerUnit} 
            pageSize={wordsPerPage} 
            onPageChange={handlePageChange}
            currentPage={currentPage} />
          <Dictionary words={words} />
        </>
      }
    </div>
  );
};

export default Unit;