import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomPagination from '../../../components/ui/Pagination';
import { GameMode, IUser } from '../../../types/types';
import Dictionary from '../Dictionary';
import { wordsPerUnit } from '../../../data/constants';
import { wordsPerPage } from '../../../data/constants';
import Loader from '../../../components/Loader';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useFetchWords from '../hooks/useFetchWords';
import GamesNavigation from '../../Games/GamesNavigation';
import { useActions } from './../../../hooks/useActions';
import styles from './styles.module.scss';
import Section from '../../../components/Section';
import { Popover } from 'antd';


const Unit = () => {
  const { id } = useParams<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAppSelector((state) => state.auth);
  const { words, isLoading } = useFetchWords({ id: id as string, currentPage, user: user as IUser });
  const { setCurrentPageAction, setCurrentUnitAction } = useActions();

  useEffect(() => {
    setCurrentPage(1);
    setCurrentPageAction('0');
    setCurrentUnitAction((Number(id) - 1).toString());
  }, [id]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setCurrentPageAction((page - 1).toString());
  }

  return (
    <>
      <div className={`${styles['section-unit']}`}>
        <Section title={`Unit ${id}`} >
          <>

            {isLoading && <Loader />}
            {!isLoading && (words && <>
              <Dictionary words={words} />
              <CustomPagination
                total={wordsPerUnit}
                pageSize={wordsPerPage}
                onPageChange={handlePageChange}
                currentPage={currentPage} />
            </>)}
          </>
        </Section>
      </div>
      {!isLoading && <Section title={'А теперь закрепи слова со страницы в одной из игр'}>
        <GamesNavigation state={GameMode.UNIT_GAME} />
      </Section>}
    </>
  );
};

export default Unit;