import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomPagination from '../../../components/ui/Pagination';
import { IUser } from '../../../types/types';
import Dictionary from '../Dictionary';
import { wordsPerUnit } from '../../../data/constants';
import { wordsPerPage } from '../../../data/constants';
import Loader from '../../../components/Loader';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useFetchWords from '../hooks/useFetchWords';

const Unit = () => {
  const { id } = useParams<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const {words, isLoading} = useFetchWords({ id: id as string, currentPage, isAuth, user: user as IUser });
  
  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  }

  if (isLoading) return <Loader />;

  return (
    <div>
      <p>Unit {id}</p>
      {words && <>
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