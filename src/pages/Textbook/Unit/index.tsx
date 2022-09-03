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
import ArrowSvg from '../../../assets/img/icons/arrow.svg';
import Container from '../../../components/Container';
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

  if (isLoading) return <Loader />;
  return (
    <>
      <section className={styles['section']}>
        <Container>
          <>
            <p className={styles['unit__title']}>Unit {id}</p>
            {words && <>
              <Dictionary words={words} />
              <CustomPagination
                total={wordsPerUnit}
                pageSize={wordsPerPage}
                onPageChange={handlePageChange}
                currentPage={currentPage} />
            </>
            }
          </>
        </Container>
      </section >
      <section className={`${styles['section']} ${styles['section__game-nav']}`}>
        <Container>
          <>
            <div className={styles['section__title']}>
              <h3 className={styles['section__title_text']}>А теперь закрепи слова со страницы в одной из игр</h3>
              <span className={styles['section__title_icon']}>
                {
                  <svg xmlns="http://www.w3.org/2000/svg" href="http://www.w3.org/1999/xlink" width="77" height="30" viewBox="0 0 77 30">
                    <g>
                      <image width="77" height="30" href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAeCAYAAABpE5PpAAAEMUlEQVRoge2Ze4hVVRTGf46WMyWmZvkaNSWfST7I1EINyVQ0kSxsQiyS3JFo/lGhUQSCJokk5aONhijhHyGRkKTlI3JMFKQaBx2o1HS0klSs66ucGVl3vhOnw73XwblPnQ8OZ+acfc/e+zvr8a11mtXNmsUtDe8T79659sAVvP87eqvo1mYsJR4C9ica0ERaclQBfXFuSHREE2nJ4P0x4BzwdXREE2mp8S3QDucGhUc1kZYa23V3SXhUizxb5I3AXnxPYCDQG+gAtAk9x7Lfb8AvwA/AT0BtA+cJSBuDcyV4f4kCJu1OYAowERgLtA/dqwFiIus2oDVQErp/FtgGbNZxOeks3lfhXDVQCowDPqcASesDvA5MA1rJYvYA5TpbxjsO/Bv5nRHXD3gwbjX1RJcB53HuY+B9vK9OMucO4HlgUkBaocS07sBG4DAwU8TMBjoBo4A3gS1ywShhhr+AfcAakdURmCCLexU4gnPLcK5tgt9+o/PjwYV8J605MF9k2Wa/12YHAKuA0zf4XHPhrbLYXsB6YF58HuemRsaW69wd57qS56R1AXYC7wIWgF+QSrfN1qVtFu+P4v1LwOC4xcEmnFsbD/z1938GTmn0aPKYtMEqYcz1vgQekDWkj6wovK8ARgJv6QXtwrl7NWqfzo+Sp6Q9IlHZGVgKPAn8npWZva/B+0XA+HgJBd/hXGmoBjVLzzvSBsmyLDMuAN5Q/MkuvN8uq7tLieC45h+Acy0C0koiWicX6Kp41VrZcElOV+P9QckTE8rv6Gox0L9IWu0i8EEOl3iHNJCp+dUK/rlHPXFPAT1Ca+lnhF0FLENMllvEcrBYI2qIsuXcnJHl3N3xAr2+4ghQLUtbrP/7BhXBCmA5MB34KMtLfRmYAZwEntVLzDT6K2YNxLleCg3dIuVWMvQJ2t1Wo/0DnADu19/ZwMPAbiWkx1QKZQLN9fyp8qgujZhjTWBpVnrMAT6UMn4vC4TdExeScDvwWoYIs2e/Ld1VGrpeo2ripM4mXs8oNMVUdl1WrA9QF++SeP9r+MNKkSzMCBwKVGZgEwGK1XYxsfgZ8HSGhGsrJZVTittHJR/+/K89lOzDSgqEuxy1KhPKVfyOCJUP6YS5ygYRdlAdhEwp/Zg8KK2Iits9aoV0UwegY4YIe0auMTlH2bpRSFQRTNSGrJOwVz2sdMBE4hfAc3KPJ4BjhUHT/5GItCuq/2xD9wEHgFcaWXKZRVWopjuiQvxQOjaQCyQjwoLlcIlNE3orgR/lVi0buM4idUh3q61sWugrYJj6YwWLVO3uP7RpS68L5a6fKh1vEaGVGndVJHVQ0T1CPfVOetZptak3FDJZAa73jaBWFcInykIvSvyW6bgeqqT91qmReFOgoR9WYtI7dph7mbo2NW8xz6zLXPaCLMpczz6VWYvHSLu5AFwD7u/9V73LPFIAAAAASUVORK5CYII=" />
                    </g>
                  </svg>
                }
              </span>
            </div>
            <GamesNavigation state={GameMode.UNIT_GAME} />
          </>
        </Container>
      </section>
    </>
  );
};

export default Unit;